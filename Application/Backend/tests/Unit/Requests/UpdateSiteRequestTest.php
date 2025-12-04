<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Api\V1\UpdateSiteRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class UpdateSiteRequestTest extends TestCase
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

        $request = new UpdateSiteRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_authorize_returns_false_when_not_authenticated(): void
    {
        $request = new UpdateSiteRequest();

        $this->assertFalse($request->authorize());
    }

    public function test_validation_passes_with_valid_data(): void
    {
        $data = [
            'name' => 'Updated Site',
            'description' => 'Updated description.',
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_without_optional_description(): void
    {
        $data = [
            'name' => 'Updated Site',
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_name_is_missing(): void
    {
        $data = [
            'description' => 'Some description',
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_name_is_not_string(): void
    {
        $data = [
            'name' => 12345,
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_name_exceeds_max_length(): void
    {
        $data = [
            'name' => str_repeat('a', 256),
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_description_is_not_string(): void
    {
        $data = [
            'name' => 'Updated Site',
            'description' => 12345,
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('description', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_null_description(): void
    {
        $data = [
            'name' => 'Updated Site',
            'description' => null,
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_long_description(): void
    {
        $data = [
            'name' => 'Updated Site',
            'description' => str_repeat('a', 1000),
        ];

        $request = new UpdateSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }
}

