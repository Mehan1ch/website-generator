<?php

namespace Tests\Unit\Services;

use App\Enums\EditorContentExample;
use App\Http\Resources\Api\V1\SiteDeploymentError;
use App\Http\Resources\Api\V1\SiteDeploymentResponse;
use App\Models\Page;
use App\Models\Site;
use App\Models\User;
use App\Services\DeploymentService;
use App\States\Draft;
use App\States\Published;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig;
use Spatie\ModelStates\Exceptions\CouldNotPerformTransition;
use Tests\TestCase;

class DeploymentServiceTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Site $site;

    /**
     * @throws FileIsTooBig
     * @throws FileDoesNotExist
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->site = $this->user->sites()->create([
            'name' => 'Test Site',
            'subdomain' => 'testsite',
        ]);

        Storage::fake('s3');

        /* @var Page $page */
        $page = $this->site->pages()->first();
        $page->update([
            "content" => EditorContentExample::ENCODED->value
        ]);
        $page->addMediaFromString('<html lang="en"><body>Testing</body></html>')
            ->setFileName($page->url . ".html")
            ->toMediaCollection('static_html');
    }

    public function test_show_returns_deployment_status_successfully(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Deployment is running']),
        ]);

        $result = DeploymentService::show($this->site);

        $this->assertInstanceOf(SiteDeploymentResponse::class, $result);
        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/deployment/')
                && str_contains($request->url(), $this->site->subdomain)
                && $request->method() === 'GET';
        });
    }

    public function test_show_returns_error_on_failed_response(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Deployment not found', 'error' => ['Not found']], 404),
        ]);

        $result = DeploymentService::show($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->assertEquals('Deployment not found', $result->resource->message);
    }

    public function test_show_handles_connection_exception(): void
    {
        Http::fake(fn() => throw new ConnectionException('Connection failed'));

        $result = DeploymentService::show($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->assertEquals('Could not connect to deployment server.', $result->resource->message);
    }

    /**
     * @throws CouldNotPerformTransition
     */
    public function test_store_deploys_site_successfully(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Deployment created successfully'], 201),
        ]);

        $this->site->state->transitionTo(Draft::class);
        $this->site->save();

        $result = DeploymentService::store($this->site);
        $this->assertInstanceOf(SiteDeploymentResponse::class, $result);
        $this->site->refresh();
        $this->assertTrue($this->site->state->equals(Published::class));

        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/deployment')
                && $request->method() === 'POST';
        });
    }

    public function test_store_fails_when_site_has_no_pages(): void
    {
        $this->site->pages()->delete();
        $this->site->refresh();

        $result = DeploymentService::store($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->assertEquals('Site has no pages to deploy.', $result->resource->message);
        Http::assertNothingSent();
    }

    public function test_store_fails_when_pages_are_empty(): void
    {
        $this->site->pages->first()->deleteAllMedia();

        $result = DeploymentService::store($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->assertEquals('One or more pages are empty.', $result->resource->message);
        Http::assertNothingSent();
    }

    public function test_store_returns_error_when_deployment_fails(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Deployment failed', 'error' => ['Resource limit exceeded']], 400),
        ]);

        $result = DeploymentService::store($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->site->refresh();
        $this->assertTrue($this->site->state->equals(Draft::class));
    }

    /**
     * @throws CouldNotPerformTransition
     */
    public function test_update_updates_deployment_successfully(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Deployment updated successfully']),
        ]);

        $this->site->state->transitionTo(Draft::class);
        $this->site->save();

        $result = DeploymentService::update($this->site);

        $this->assertInstanceOf(SiteDeploymentResponse::class, $result);
        $this->site->refresh();
        $this->assertTrue($this->site->state->equals(Published::class));

        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/deployment')
                && $request->method() === 'PUT';
        });
    }

    public function test_update_fails_when_site_has_no_pages(): void
    {
        $this->site->pages()->delete();
        $this->site->refresh();

        $result = DeploymentService::update($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->assertEquals('Site has no pages to deploy.', $result->resource->message);
    }

    /**
     * @throws CouldNotPerformTransition
     */
    public function test_destroy_removes_deployment_successfully(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Deployment destroyed successfully']),
        ]);

        $this->site->state->transitionTo(Published::class);

        $result = DeploymentService::destroy($this->site);

        $this->assertInstanceOf(SiteDeploymentResponse::class, $result);
        $this->site->refresh();
        $this->assertTrue($this->site->state->equals(Draft::class));
        $this->assertNull($this->site->published_at);

        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/deployment')
                && str_contains($request->url(), $this->site->subdomain)
                && $request->method() === 'DELETE';
        });
    }

    public function test_restart_restarts_deployment_successfully(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Deployment restarted successfully']),
        ]);

        $result = DeploymentService::restart($this->site);

        $this->assertInstanceOf(SiteDeploymentResponse::class, $result);
        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/deployment')
                && str_contains($request->url(), $this->site->subdomain)
                && str_contains($request->url(), 'restart')
                && $request->method() === 'POST';
        });
    }

    public function test_restart_returns_error_on_failure(): void
    {
        Http::fake([
            '*' => Http::response(['message' => 'Restart failed', 'error' => ['Pod not found']], 404),
        ]);

        $result = DeploymentService::restart($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->assertEquals('Restart failed', $result->resource->message);
    }

    public function test_restart_handles_connection_exception(): void
    {
        Http::fake(fn() => throw new ConnectionException('Network error'));

        $result = DeploymentService::restart($this->site);

        $this->assertInstanceOf(SiteDeploymentError::class, $result);
        $this->assertEquals('Could not connect to deployment server.', $result->resource->message);
    }

    public function test_deployment_url_is_built_correctly(): void
    {
        config(['app.kube_namespace' => 'test-namespace']);
        config(['app.kube_proxy_url' => 'http://proxy.test']);

        Http::fake([
            'http://proxy.test/deployment/test-namespace/testsite' => Http::response(['message' => 'OK']),
        ]);

        DeploymentService::show($this->site);

        Http::assertSent(function ($request) {
            return $request->url() === 'http://proxy.test/deployment/test-namespace/testsite';
        });
    }
}
