<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->has(
            Site::factory()->has(
                Page::factory()->count(3)
            )->count(5)
        )->create();
    }

    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->actingAs($this->user)->get("/api/v1/dashboard");

        $response->assertJson([
            'data' => [
                'total_sites' => 5,
                'total_pages' => 20, //3*5 + 1*5 (Home page for each site)
            ],
        ]);

        $response->assertJsonStructure([
            'data' => [
                'total_sites',
                'published_sites',
                'draft_sites',
                'total_pages',
                'recent_activity' => [
                    'name',
                    'updated_at',
                ],
                'latest_site' => [
                    'name',
                    'created_at',
                ],
            ],
        ]);

        $response->assertStatus(200);
    }
}
