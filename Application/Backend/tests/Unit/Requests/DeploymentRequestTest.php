<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Api\V1\DeploymentRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class DeploymentRequestTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_authorize_returns_true_when_authenticated(): void
    {
        $this->actingAs($this->user);

        $request = new DeploymentRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_authorize_returns_false_when_not_authenticated(): void
    {
        $request = new DeploymentRequest();

        $this->assertFalse($request->authorize());
    }

    public function test_validation_passes_with_valid_html(): void
    {
        $data = [
            'html' => '<html lang="en"><body>Test</body></html>',
        ];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_encoded_html(): void
    {
        $data = [
            'html' => 'eJzT0yMAAGTvBe8=',
        ];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_html_is_missing(): void
    {
        $data = [];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('html', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_html_is_null(): void
    {
        $data = [
            'html' => null,
        ];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('html', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_html_is_not_string(): void
    {
        $data = [
            'html' => 12345,
        ];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('html', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_html_is_array(): void
    {
        $data = [
            'html' => ['content' => 'test'],
        ];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('html', $validator->errors()->toArray());
    }

    public function test_validation_fails_with_empty_string_html(): void
    {
        $data = [
            'html' => '',
        ];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('html', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_long_html(): void
    {
        $data = [
            'html' => str_repeat('<div>content</div>', 1000),
        ];

        $request = new DeploymentRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }
}

