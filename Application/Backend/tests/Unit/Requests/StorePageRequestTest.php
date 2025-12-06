<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Api\V1\StorePageRequest;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class StorePageRequestTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Site $site;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->site = Site::factory()->create(['user_id' => $this->user->id]);
    }

    public function test_authorize_returns_true_when_authenticated(): void
    {
        $this->actingAs($this->user);

        $request = new StorePageRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_authorize_returns_false_when_not_authenticated(): void
    {
        $request = new StorePageRequest();

        $this->assertFalse($request->authorize());
    }

    public function test_validation_passes_with_valid_data(): void
    {
        $data = [
            'title' => 'My Page',
            'url' => '/my-page',
            'html' => 'eJzT0yMAAGTvBe8=',
            'content' => 'eJzT0yMAAGTvBe8=',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_title_is_missing(): void
    {
        $data = [
            'url' => '/my-page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_title_exceeds_max_length(): void
    {
        $data = [
            'title' => str_repeat('a', 256),
            'url' => '/my-page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_url_is_missing(): void
    {
        $data = [
            'title' => 'My Page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('url', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_url_does_not_start_with_slash(): void
    {
        $data = [
            'title' => 'My Page',
            'url' => 'my-page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('url', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_url_exceeds_max_length(): void
    {
        $data = [
            'title' => 'My Page',
            'url' => '/' . str_repeat('a', 255),
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('url', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_url_is_duplicate_for_same_site(): void
    {
        Page::factory()->create([
            'site_id' => $this->site->id,
            'url' => '/existing-page',
        ]);

        $data = [
            'title' => 'My Page',
            'url' => '/existing-page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('url', $validator->errors()->toArray());
    }

    public function test_validation_passes_when_url_is_duplicate_for_different_site(): void
    {
        /* @var Site $otherSite */
        $otherSite = Site::factory()->create(['user_id' => $this->user->id]);
        Page::factory()->create([
            'site_id' => $otherSite->id,
            'url' => '/same-page',
        ]);

        $data = [
            'title' => 'My Page',
            'url' => '/same-page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_when_html_is_optional(): void
    {
        $data = [
            'title' => 'My Page',
            'url' => '/my-page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_when_content_is_optional(): void
    {
        $data = [
            'title' => 'My Page',
            'url' => '/my-page',
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_html_is_not_string(): void
    {
        $data = [
            'title' => 'My Page',
            'url' => '/my-page',
            'html' => 12345,
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('html', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_content_is_not_string(): void
    {
        $data = [
            'title' => 'My Page',
            'url' => '/my-page',
            'content' => ['array' => 'value'],
        ];

        $request = new StorePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->with('site')->willReturn($this->site);
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('content', $validator->errors()->toArray());
    }
}

