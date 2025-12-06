<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Api\V1\UpdatePageRequest;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class UpdatePageRequestTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Site $site;
    protected Page $page;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->site = Site::factory()->create(['user_id' => $this->user->id]);
        $this->page = Page::factory()->create([
            'site_id' => $this->site->id,
            'url' => '/existing-page',
        ]);
    }

    public function test_authorize_returns_true_when_authenticated(): void
    {
        $this->actingAs($this->user);

        $request = new UpdatePageRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_authorize_returns_false_when_not_authenticated(): void
    {
        $request = new UpdatePageRequest();

        $this->assertFalse($request->authorize());
    }

    public function test_validation_passes_with_valid_data(): void
    {
        $data = [
            'title' => 'Updated Page',
            'url' => '/updated-page',
            'html' => 'eJzT0yMAAGTvBe8=',
            'content' => 'eJzT0yMAAGTvBe8=',
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_when_all_fields_are_optional(): void
    {
        $data = [];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_title_exceeds_max_length(): void
    {
        $data = [
            'title' => str_repeat('a', 256),
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('title', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_url_does_not_start_with_slash(): void
    {
        $data = [
            'url' => 'my-page',
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('url', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_url_exceeds_max_length(): void
    {
        $data = [
            'url' => '/' . str_repeat('a', 255),
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
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
            'url' => '/another-page',
        ]);

        $data = [
            'url' => '/another-page',
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('url', $validator->errors()->toArray());
    }

    public function test_validation_passes_when_url_is_same_as_current_page(): void
    {
        $data = [
            'url' => '/existing-page', // Same as current page
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
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
            'url' => '/same-page',
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_html_is_not_string(): void
    {
        $data = [
            'html' => 12345,
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('html', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_content_is_not_string(): void
    {
        $data = [
            'content' => ['array' => 'value'],
        ];

        $request = new UpdatePageRequest();
        $request->setRouteResolver(function () {
            $route = $this->createMock(Route::class);
            $route->method('parameter')->willReturnCallback(function ($param) {
                return $param === 'site' ? $this->site : $this->page;
            });
            return $route;
        });

        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('content', $validator->errors()->toArray());
    }
}

