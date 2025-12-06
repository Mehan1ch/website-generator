<?php

namespace Feature\Controllers\Api\V1;

use App\Enums\Roles;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageTest extends TestCase
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

    public function test_authenticated_user_can_list_pages_for_their_site(): void
    {
        $this->site->pages()->create(['title' => 'About', 'url' => '/about']);
        $this->site->pages()->create(['title' => 'Contact', 'url' => '/contact']);

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/{$this->site->id}/page");

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'url'],
                ],
            ]);
    }

    public function test_unauthenticated_user_cannot_list_pages(): void
    {
        $response = $this->getJson("/api/v1/site/{$this->site->id}/page");

        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_create_a_page(): void
    {
        $pageData = [
            'title' => 'New Page',
            'url' => '/new-page',
        ];

        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->site->id}/page", $pageData);

        $response->assertStatus(201)
            ->assertJson([
                "title" => "New Page",
                "url" => "/new-page",
            ]);

        $this->assertDatabaseHas('pages', [
            'title' => 'New Page',
            'url' => '/new-page',
            'site_id' => $this->site->id,
        ]);
    }

    public function test_page_creation_fails_with_duplicate_url_in_same_site(): void
    {
        $this->site->pages()->create(['title' => 'Existing Page', 'url' => '/existing']);

        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->site->id}/page", [
            'title' => 'Another Page',
            'url' => '/existing',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['url']);
    }

    public function test_same_url_allowed_in_different_sites(): void
    {
        $this->site->pages()->create(['title' => 'About', 'url' => '/about']);

        /* @var Site $anotherSite */
        $anotherSite = $this->user->sites()->create([
            'name' => 'Another Site',
            'subdomain' => 'anothersite',
        ]);

        $response = $this->actingAs($this->user)->postJson("/api/v1/site/$anotherSite->id/page", [
            'title' => 'About',
            'url' => '/about',
        ]);

        $response->assertStatus(201);
    }

    public function test_page_url_must_start_with_slash(): void
    {
        $response = $this->actingAs($this->user)->postJson("/api/v1/site/{$this->site->id}/page", [
            'title' => 'Invalid URL Page',
            'url' => 'no-slash',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['url']);
    }

    public function test_authenticated_user_can_view_their_page(): void
    {
        /* @var Page $page */
        $page = $this->site->pages()->create([
            'title' => 'View Page',
            'url' => '/view-page',
        ]);

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/{$this->site->id}/page/$page->id");

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'View Page')
            ->assertJsonPath('data.url', '/view-page');
    }

    public function test_user_cannot_view_page_from_another_users_site(): void
    {
        /* @var Page $otherPage */
        $otherPage = $this->otherSite->pages()->create([
            'title' => 'Other Page',
            'url' => '/other-page',
        ]);

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/{$this->otherSite->id}/page/$otherPage->id");

        $response->assertStatus(403);
    }

    public function test_viewing_page_with_wrong_site_returns_404(): void
    {
        /* @var Page $page */
        $page = $this->site->pages()->create([
            'title' => 'My Page',
            'url' => '/my-page',
        ]);

        /* @var Site $anotherSite */
        $anotherSite = $this->user->sites()->create([
            'name' => 'Another Site',
            'subdomain' => 'anothersite2',
        ]);

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/$anotherSite->id/page/$page->id");

        $response->assertStatus(404);
    }

    public function test_authenticated_user_can_update_their_page(): void
    {
        /* @var Page $page */
        $page = $this->site->pages()->create([
            'title' => 'Original Title',
            'url' => '/original-url',
        ]);

        $response = $this->actingAs($this->user)->putJson("/api/v1/site/{$this->site->id}/page/$page->id", [
            'title' => 'Updated Title',
        ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.title', 'Updated Title');

        $this->assertDatabaseHas('pages', [
            'id' => $page->id,
            'title' => 'Updated Title',
        ]);
    }

    public function test_user_cannot_update_page_from_another_users_site(): void
    {
        /* @var Page $otherPage */
        $otherPage = $this->otherSite->pages()->create([
            'title' => 'Other Page',
            'url' => '/other-page',
        ]);

        $response = $this->actingAs($this->user)->putJson("/api/v1/site/{$this->otherSite->id}/page/$otherPage->id", [
            'title' => 'Hacked Title',
        ]);

        $response->assertStatus(403);
    }

    public function test_homepage_url_cannot_be_changed(): void
    {
        $homepage = $this->site->pages()->where('url', '/')->first();

        $response = $this->actingAs($this->user)->putJson("/api/v1/site/{$this->site->id}/page/$homepage->id", [
            'url' => '/new-homepage-url',
        ]);

        $response->assertStatus(500);
    }

    public function test_authenticated_user_can_delete_their_page(): void
    {
        /* @var Page $page */
        $page = $this->site->pages()->create([
            'title' => 'Page To Delete',
            'url' => '/page-to-delete',
        ]);

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/site/{$this->site->id}/page/$page->id");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('pages', ['id' => $page->id]);
    }

    public function test_user_cannot_delete_page_from_another_users_site(): void
    {
        /* @var Page $otherPage */
        $otherPage = $this->otherSite->pages()->create([
            'title' => 'Other Page',
            'url' => '/other-page-delete',
        ]);

        $response = $this->actingAs($this->user)->deleteJson("/api/v1/site/{$this->otherSite->id}/page/$otherPage->id");

        $response->assertStatus(403);
        $this->assertDatabaseHas('pages', ['id' => $otherPage->id]);
    }

    public function test_unverified_user_cannot_create_page(): void
    {
        $unverifiedUser = User::factory()->unverified()->create();
        $unverifiedUser->assignRole(Roles::USER);

        /* @var Site $unverifiedSite */
        $unverifiedSite = $unverifiedUser->sites()->create([
            'name' => 'Unverified Site',
            'subdomain' => 'unverifiedsite',
        ]);

        $response = $this->actingAs($unverifiedUser)->postJson("/api/v1/site/$unverifiedSite->id/page", [
            'title' => 'Test Page',
            'url' => '/test-page',
        ]);

        $response->assertStatus(403);
    }

    public function test_pagination_works_for_page_listing(): void
    {
        Page::factory(5)->for($this->site)->state(
            fn() => [
                'title' => 'Sample Page',
                'url' => '/sample-page' . fake()->unique()->numberBetween(1, 1000)
            ]
        )->create();

        $response = $this->actingAs($this->user)->getJson("/api/v1/site/{$this->site->id}/page?per_page=2");

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data')
            ->assertJsonStructure([
                'data',
                'links',
                'meta',
            ]);
    }
}
