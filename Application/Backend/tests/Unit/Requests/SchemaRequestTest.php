<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Api\V1\SchemaRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class SchemaRequestTest extends TestCase
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

        $request = new SchemaRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_authorize_returns_false_when_not_authenticated(): void
    {
        $request = new SchemaRequest();

        $this->assertFalse($request->authorize());
    }

    public function test_validation_passes_with_valid_data(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
            'description' => 'A schema for portfolio',
            'content' => 'eJzT0yMAAGTvBe8=',
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_without_optional_fields(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_name_is_missing(): void
    {
        $data = [
            'description' => 'A schema description',
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_name_is_not_string(): void
    {
        $data = [
            'name' => 12345,
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_name_exceeds_max_length(): void
    {
        $data = [
            'name' => str_repeat('a', 21), // Max is 20
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_name_at_max_length(): void
    {
        $data = [
            'name' => str_repeat('a', 20), // Exactly 20
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_description_is_not_string(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
            'description' => 12345,
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('description', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_null_description(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
            'description' => null,
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_content_is_not_string(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
            'content' => ['array' => 'value'],
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('content', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_null_content(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
            'content' => null,
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_long_description(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
            'description' => str_repeat('a', 1000),
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_long_content(): void
    {
        $data = [
            'name' => 'Portfolio Schema',
            'content' => str_repeat('a', 10000),
        ];

        $request = new SchemaRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }
}

