<?php

namespace Feature\Controllers\Api\V1;

use App\Enums\Roles;
use App\Models\Schema;
use App\Models\User;
use App\States\Draft;
use App\States\Published;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SchemaTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->adminUser = User::factory()->create();
        $this->adminUser->assignRole(Roles::ADMIN);
    }

    public function test_authenticated_user_can_list_published_schemas(): void
    {
        $numberOfPublishedSchemas = Schema::query()->whereState("state", Published::class)->count();

        Schema::factory()->create(['state' => Published::class]);
        Schema::factory()->create(['state' => Published::class]);
        Schema::factory()->create(['state' => Draft::class]);

        $newNumberOfPublishedSchemas = $numberOfPublishedSchemas + 2;

        $response = $this->actingAs($this->user)->getJson('/api/v1/schema');

        $response->assertStatus(200)
            ->assertJsonCount($newNumberOfPublishedSchemas, 'data');
    }

    public function test_admin_can_list_all_schemas_including_drafts(): void
    {

        Schema::factory()->create(['state' => Published::$name]);
        Schema::factory()->create(['state' => Draft::$name]);
        $schemaCount = Schema::count();

        $response = $this->actingAs($this->adminUser)->getJson('/api/v1/schema');

        $response->assertStatus(200)
            ->assertJsonCount($schemaCount, 'data');
    }

    public function test_unauthenticated_user_cannot_list_schemas(): void
    {
        $response = $this->getJson('/api/v1/schema');

        $response->assertStatus(401);
    }

    public function test_admin_can_create_schema(): void
    {
        $schemaData = [
            'name' => 'Portfolio',
            'description' => 'A portfolio schema',
        ];

        $response = $this->actingAs($this->adminUser)->postJson('/api/v1/schema', $schemaData);

        $response->assertStatus(201)
            ->assertJson([
                'name' => 'Portfolio',
                'description' => 'A portfolio schema',
            ]);

        $this->assertDatabaseHas('schemas', [
            'name' => 'Portfolio',
        ]);
    }

    public function test_regular_user_cannot_create_schema(): void
    {
        $schemaData = [
            'name' => 'Test Schema',
            'description' => 'Test description',
        ];

        $response = $this->actingAs($this->user)->postJson('/api/v1/schema', $schemaData);

        $response->assertStatus(403);
    }


    public function test_authenticated_user_can_view_published_schema(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create(['state' => Published::$name]);

        $response = $this->actingAs($this->user)->getJson("/api/v1/schema/$schema->id");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $schema->id,
                    'name' => $schema->name,
                    'description' => $schema->description,
                    'content' => $schema->content,
                    'state' => $schema->state,
                    'created_at' => $schema->created_at->toJSON(),
                    'updated_at' => $schema->updated_at->toJSON(),
                    'published_at' => $schema->published_at?->toJSON(),
                ],
            ]);
    }

    public function test_admin_can_update_schema(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create(['name' => 'Original']);

        $response = $this->actingAs($this->adminUser)->putJson("/api/v1/schema/$schema->id", [
            'name' => 'Updated',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'Updated');

        $this->assertDatabaseHas('schemas', [
            'id' => $schema->id,
            'name' => 'Updated',
        ]);
    }

    public function test_regular_user_cannot_update_schema(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create();

        $response = $this->actingAs($this->user)->putJson("/api/v1/schema/$schema->id", [
            'name' => 'Hacked',
        ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_publish_schema(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create(['state' => Draft::$name]);

        $response = $this->actingAs($this->adminUser)->postJson("/api/v1/schema/$schema->id/publish");

        $response->assertStatus(200);

        $schema->refresh();
        $this->assertTrue($schema->state->equals(Published::class));
    }

    public function test_regular_user_cannot_publish_schema(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create(['state' => Draft::$name]);

        $response = $this->actingAs($this->user)->postJson("/api/v1/schema/$schema->id/publish");

        $response->assertStatus(403);
    }

    public function test_admin_can_delete_schema(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create();
        $schemaId = $schema->id;

        $response = $this->actingAs($this->adminUser)->deleteJson("/api/v1/schema/$schemaId");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('schemas', ['id' => $schemaId]);
    }

    public function test_regular_user_cannot_delete_schema(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create();

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/schema/$schema->id");

        $response->assertStatus(403);
        $this->assertDatabaseHas('schemas', ['id' => $schema->id]);
    }

    public function test_updating_published_schema_sets_state_to_draft(): void
    {
        /* @var Schema $schema */
        $schema = Schema::factory()->create([
            'name' => 'Original',
            'state' => Published::$name,
        ]);

        $this->actingAs($this->adminUser)->putJson("/api/v1/schema/$schema->id", [
            'name' => 'Updated',
        ]);

        $schema->refresh();
        $this->assertTrue($schema->state->equals(Draft::class));
    }

    public function test_pagination_works_for_schema_listing(): void
    {
        Schema::factory()->count(5)->create(['state' => Published::class]);

        $response = $this->actingAs($this->user)->getJson('/api/v1/schema?per_page=2');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'data',
                'links',
                'meta',
            ]);
    }

    public function test_unverified_user_cannot_access_schemas(): void
    {
        $unverifiedUser = User::factory()->unverified()->create();
        $unverifiedUser->assignRole(Roles::USER);

        $response = $this->actingAs($unverifiedUser)->getJson('/api/v1/schema');

        $response->assertStatus(403);
    }
}
