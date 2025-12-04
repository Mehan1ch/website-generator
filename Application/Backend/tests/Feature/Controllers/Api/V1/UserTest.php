<?php

namespace Feature\Controllers\Api\V1;

use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_authenticated_user_can_get_their_info(): void
    {
        $response = $this->actingAs($this->user)->getJson('/api/v1/user');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'email_verified_at' => $this->user->email_verified_at->toJson(),
                    'avatar' => $this->user->avatar,
                    'is_admin' => false,
                    'created_at' => $this->user->created_at->toJson(),
                    'updated_at' => $this->user->updated_at->toJson(),
                ],
            ]);
    }

    public function test_unauthenticated_user_cannot_get_user_info(): void
    {
        $response = $this->getJson('/api/v1/user');

        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_delete_their_account(): void
    {
        $userId = $this->user->id;

        $response = $this->actingAs($this->user)->deleteJson('/api/v1/user');

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $userId]);
    }

    public function test_unauthenticated_user_cannot_delete_account(): void
    {
        $response = $this->deleteJson('/api/v1/user');

        $response->assertStatus(401);
    }

    public function test_deleting_user_removes_associated_sites(): void
    {
        /* @var Site $site */
        $site = $this->user->sites()->create([
            'name' => 'Test Site',
            'subdomain' => 'testsite',
        ]);

        $siteId = $site->id;

        $this->actingAs($this->user)->deleteJson('/api/v1/user');

        $this->assertDatabaseMissing('sites', ['id' => $siteId]);
    }
}
