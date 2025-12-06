<?php

namespace Tests\Feature\Controllers\Api\V1;

use App\Models\Site;
use App\Models\User;
use App\Services\DeploymentService;
use App\Http\Resources\Api\V1\SiteDeploymentError;
use App\Http\Resources\Api\V1\SiteDeploymentResponse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeploymentTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected User $otherUser;
    protected Site $site;
    protected Site $otherSite;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();

        $this->site = $this->user->sites()->create([
            'name' => 'Test Site',
            'subdomain' => 'testsite',
        ]);

        $this->otherSite = $this->otherUser->sites()->create([
            'name' => 'Other Site',
            'subdomain' => 'othersite',
        ]);
    }

    public function test_authenticated_user_can_view_their_site_deployment(): void
    {
        $mockResponse = new SiteDeploymentResponse((object)[
            "message" => [
                'apiVersion' => '1.0',
                'kind' => 'deployment',
                'metadata' => [],
                'spec' => [],
                'status' => [],
            ]
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockResponse) {
            $mock->shouldReceive('show')
                ->once()
                ->andReturn($mockResponse);
        });

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(200);
    }

    public function test_unauthenticated_user_cannot_view_deployment(): void
    {
        $response = $this->getJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(401);
    }

    public function test_user_cannot_view_another_users_site_deployment(): void
    {
        $response = $this->actingAs($this->user)->getJson("/api/v1/site/{$this->otherSite->id}/deployment");

        $response->assertStatus(403);
    }

    public function test_unverified_user_cannot_view_deployment(): void
    {
        $unverifiedUser = User::factory()->unverified()->create();
        /* @var Site $unverifiedSite */
        $unverifiedSite = $unverifiedUser->sites()->create([
            'name' => 'Unverified Site',
            'subdomain' => 'unverifiedsite',
        ]);

        $response = $this->actingAs($unverifiedUser)->getJson("/api/v1/site/$unverifiedSite->id/deployment");

        $response->assertStatus(403);
    }

    public function test_authenticated_user_can_create_deployment(): void
    {
        $homepage = $this->site->pages()->where('url', '/')->first();
        $homepage->update(['content' => base64_encode(gzdeflate('<html lang="en"><body>Test</body></html>'))]);

        $mockResponse = new SiteDeploymentResponse((object)[
            'message' => 'Deployment created successfully.',
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockResponse) {
            $mock->shouldReceive('store')
                ->once()
                ->andReturn($mockResponse);
        });

        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(201);
    }

    public function test_unauthenticated_user_cannot_create_deployment(): void
    {
        $response = $this->postJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(401);
    }

    public function test_user_cannot_create_deployment_for_another_users_site(): void
    {
        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->otherSite->id}/deployment");

        $response->assertStatus(403);
    }

    public function test_deployment_creation_returns_error_on_failure(): void
    {
        $mockError = new SiteDeploymentError((object)[
            'message' => 'Failed to create deployment.',
            'error' => ['Connection refused'],
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockError) {
            $mock->shouldReceive('store')
                ->once()
                ->andReturn($mockError);
        });

        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(400);
    }

    public function test_authenticated_user_can_update_deployment(): void
    {
        $mockResponse = new SiteDeploymentResponse((object)[
            'message' => 'Deployment updated successfully.',
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockResponse) {
            $mock->shouldReceive('update')
                ->once()
                ->andReturn($mockResponse);
        });

        $response = $this->actingAs($this->user)->putJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(200);
    }

    public function test_unauthenticated_user_cannot_update_deployment(): void
    {
        $response = $this->putJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(401);
    }

    public function test_user_cannot_update_another_users_site_deployment(): void
    {
        $response = $this->actingAs($this->user)->putJson("/api/v1/site/{$this->otherSite->id}/deployment");

        $response->assertStatus(403);
    }

    public function test_authenticated_user_can_delete_deployment(): void
    {
        $mockResponse = new SiteDeploymentResponse((object)[
            'message' => 'Deployment deleted successfully.',
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockResponse) {
            $mock->shouldReceive('destroy')
                ->once()
                ->andReturn($mockResponse);
        });

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(204);
    }

    public function test_unauthenticated_user_cannot_delete_deployment(): void
    {
        $response = $this->deleteJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(401);
    }

    public function test_user_cannot_delete_another_users_site_deployment(): void
    {
        $response = $this->actingAs($this->user)->deleteJson("/api/v1/site/{$this->otherSite->id}/deployment");

        $response->assertStatus(403);
    }

    public function test_authenticated_user_can_restart_deployment(): void
    {
        $mockResponse = new SiteDeploymentResponse((object)[
            'message' => 'Deployment restarted successfully.',
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockResponse) {
            $mock->shouldReceive('restart')
                ->once()
                ->andReturn($mockResponse);
        });

        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->site->id}/deployment/restart");

        $response->assertStatus(200);
    }

    public function test_unauthenticated_user_cannot_restart_deployment(): void
    {
        $response = $this->postJson("/api/v1/site/{$this->site->id}/deployment/restart");

        $response->assertStatus(401);
    }

    public function test_user_cannot_restart_another_users_site_deployment(): void
    {
        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->otherSite->id}/deployment/restart");

        $response->assertStatus(403);
    }

    public function test_deployment_view_returns_error_on_failure(): void
    {
        $mockError = new SiteDeploymentError((object)[
            'message' => 'Failed to fetch deployment.',
            'error' => ['Deployment not found'],
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockError) {
            $mock->shouldReceive('show')
                ->once()
                ->andReturn($mockError);
        });

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(400);
    }

    public function test_deployment_update_returns_error_on_failure(): void
    {
        $mockError = new SiteDeploymentError((object)[
            'message' => 'Failed to update deployment.',
            'error' => ['Update failed'],
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockError) {
            $mock->shouldReceive('update')
                ->once()
                ->andReturn($mockError);
        });

        $response = $this->actingAs($this->user)->putJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(400);
    }

    public function test_deployment_delete_returns_error_on_failure(): void
    {
        $mockError = new SiteDeploymentError((object)[
            'message' => 'Failed to delete deployment.',
            'error' => ['Delete failed'],
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockError) {
            $mock->shouldReceive('destroy')
                ->once()
                ->andReturn($mockError);
        });

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/site/{$this->site->id}/deployment");

        $response->assertStatus(400);
    }

    public function test_deployment_restart_returns_error_on_failure(): void
    {
        $mockError = new SiteDeploymentError((object)[
            'message' => 'Failed to restart deployment.',
            'error' => ['Restart failed'],
        ]);

        $this->mock(DeploymentService::class, function ($mock) use ($mockError) {
            $mock->shouldReceive('restart')
                ->once()
                ->andReturn($mockError);
        });

        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->site->id}/deployment/restart");

        $response->assertStatus(400);
    }
}

