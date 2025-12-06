<?php

namespace Feature\Controllers\Api\V1;

use App\Enums\Roles;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use App\States\Draft;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiteTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected User $otherUser;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();
    }

    public function test_authenticated_user_can_list_their_sites(): void
    {
        $this->user->sites()->create(['name' => 'Site 1', 'subdomain' => 'site1']);
        $this->user->sites()->create(['name' => 'Site 2', 'subdomain' => 'site2']);

        $this->otherUser->sites()->create(['name' => 'Other Site', 'subdomain' => 'othersite']);

        $response = $this->actingAs($this->user)->getJson('/api/v1/site');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'subdomain'],
                ],
            ]);
    }

    public function test_unauthenticated_user_cannot_list_sites(): void
    {
        $response = $this->getJson('/api/v1/site');

        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_create_a_site(): void
    {
        $siteData = [
            'name' => 'My New Site',
            'subdomain' => 'mynewsite',
            'description' => 'A test site description',
        ];

        $response = $this->actingAs($this->user)->postJson('/api/v1/site', $siteData);

        $response->assertStatus(201)
            ->assertJson([
                'name' => 'My New Site',
                'subdomain' => 'mynewsite',
                'description' => 'A test site description',
                'user_id' => $this->user->id,
                'state' => Draft::$name,
                'number_of_pages' => 1, // Home page created automatically
                'published_at' => null
            ]);

        $this->assertDatabaseHas('sites', [
            'name' => 'My New Site',
            'subdomain' => 'mynewsite',
            'description' => 'A test site description',
            'user_id' => $this->user->id,
        ]);
    }

    public function test_site_creation_automatically_creates_homepage(): void
    {
        $siteData = [
            'name' => 'Site With Homepage',
            'subdomain' => 'sitewithhome',
        ];

        $this->actingAs($this->user)->postJson('/api/v1/site', $siteData);

        $site = Site::where('subdomain', 'sitewithhome')->first();

        $this->assertDatabaseHas('pages', [
            'site_id' => $site->id,
            'title' => 'Home',
            'url' => '/',
        ]);
    }

    public function test_site_creation_fails_with_duplicate_subdomain(): void
    {
        $this->user->sites()->create(['name' => 'Existing Site', 'subdomain' => 'existingsite']);

        $siteData = [
            'name' => 'New Site',
            'subdomain' => 'existingsite',
        ];

        $response = $this->actingAs($this->user)->postJson('/api/v1/site', $siteData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['subdomain']);
    }

    public function test_site_creation_fails_without_required_fields(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/v1/site');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'subdomain']);
    }

    public function test_authenticated_user_can_view_their_site(): void
    {
        /* @var Site $site */
        $site = $this->user->sites()->create([
            'name' => 'My Site',
            'subdomain' => 'mysite',
        ]);

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/$site->id");

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $site->id,
                    'name' => 'My Site',
                    'subdomain' => 'mysite',
                    'user_id' => $this->user->id,
                ],
            ]);
    }

    public function test_user_cannot_view_another_users_site(): void
    {
        /* @var Site $otherSite */
        $otherSite = $this->otherUser->sites()->create([
            'name' => 'Other User Site',
            'subdomain' => 'otherusersite',
        ]);

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/$otherSite->id");

        $response->assertStatus(403);
    }

    public function test_authenticated_user_can_update_their_site(): void
    {
        /* @var Site $site */
        $site = $this->user->sites()->create([
            'name' => 'Original Name',
            'subdomain' => 'originalsite',
        ]);

        $updateData = [
            'name' => 'Updated Name',
            'description' => 'Updated description',
        ];

        $response = $this->actingAs($this->user)->putJson("/api/v1/site/$site->id", $updateData);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'Updated Name');

        $this->assertDatabaseHas('sites', [
            'id' => $site->id,
            'name' => 'Updated Name',
        ]);
    }

    public function test_user_cannot_update_another_users_site(): void
    {
        /* @var Site $otherSite */
        $otherSite = $this->otherUser->sites()->create([
            'name' => 'Other Site',
            'subdomain' => 'othersiteupdate',
        ]);

        $response = $this->actingAs($this->user)->putJson("/api/v1/site/$otherSite->id", [
            'name' => 'Hacked Name',
        ]);

        $response->assertStatus(403);
    }

    public function test_authenticated_user_can_delete_their_site(): void
    {
        /* @var Site $site */
        $site = $this->user->sites()->create([
            'name' => 'Site To Delete',
            'subdomain' => 'sitetodelete',
        ]);

        $siteId = $site->id;

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/site/$siteId");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('sites', ['id' => $siteId]);
    }

    public function test_user_cannot_delete_another_users_site(): void
    {
        /* @var Site $otherSite */
        $otherSite = $this->otherUser->sites()->create([
            'name' => 'Other Site',
            'subdomain' => 'othersitedelete',
        ]);

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/site/$otherSite->id");

        $response->assertStatus(403);
        $this->assertDatabaseHas('sites', ['id' => $otherSite->id]);
    }

    public function test_deleting_site_also_deletes_its_pages(): void
    {
        /* @var Site $site */
        $site = $this->user->sites()->create([
            'name' => 'Site With Pages',
            'subdomain' => 'sitewithpages',
        ]);

        /* @var Page $page */
        $page = $site->pages()->create([
            'title' => 'About',
            'url' => '/about',
        ]);

        $pageId = $page->id;

        $this->actingAs($this->user)->deleteJson("/api/v1/site/$site->id");

        $this->assertDatabaseMissing('pages', ['id' => $pageId]);
    }

    public function test_unverified_user_cannot_create_site(): void
    {
        $unverifiedUser = User::factory()->unverified()->create();
        $unverifiedUser->assignRole(Roles::USER);

        $response = $this->actingAs($unverifiedUser)->postJson('/api/v1/site', [
            'name' => 'Test Site',
            'subdomain' => 'testsite',
        ]);

        $response->assertStatus(403);
    }

    public function test_pagination_works_for_site_listing(): void
    {
        Site::factory(5)->for($this->user)->state(
            fn() => ['name' => 'Site', 'subdomain' => 'site' . fake()->unique()->numberBetween(1, 1000)]
        )->create();

        $response = $this->actingAs($this->user)->getJson('/api/v1/site?per_page=2');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'data',
                'links',
                'meta',
            ]);
    }
}
