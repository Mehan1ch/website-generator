<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Api\V1\StoreSiteRequest;
use App\Models\Site;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class StoreSiteRequestTest extends TestCase
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

        $request = new StoreSiteRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_authorize_returns_false_when_not_authenticated(): void
    {
        $request = new StoreSiteRequest();

        $this->assertFalse($request->authorize());
    }

    public function test_validation_passes_with_valid_data(): void
    {
        $data = [
            'name' => 'My Site',
            'subdomain' => 'mysite',
            'description' => 'This is my site description.',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_without_optional_description(): void
    {
        $data = [
            'name' => 'My Site',
            'subdomain' => 'mysite',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_name_is_missing(): void
    {
        $data = [
            'subdomain' => 'mysite',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_name_is_not_string(): void
    {
        $data = [
            'name' => 12345,
            'subdomain' => 'mysite',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_name_exceeds_max_length(): void
    {
        $data = [
            'name' => str_repeat('a', 256),
            'subdomain' => 'mysite',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('name', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_subdomain_is_missing(): void
    {
        $data = [
            'name' => 'My Site',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('subdomain', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_subdomain_is_not_string(): void
    {
        $data = [
            'name' => 'My Site',
            'subdomain' => 12345,
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('subdomain', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_subdomain_exceeds_max_length(): void
    {
        $data = [
            'name' => 'My Site',
            'subdomain' => str_repeat('a', 256),
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('subdomain', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_subdomain_is_duplicate(): void
    {
        Site::factory()->create(['subdomain' => 'existingsite']);

        $data = [
            'name' => 'My Site',
            'subdomain' => 'existingsite',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('subdomain', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_unique_subdomain(): void
    {
        Site::factory()->create(['subdomain' => 'existingsite']);

        $data = [
            'name' => 'My Site',
            'subdomain' => 'uniquesite',
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_description_is_not_string(): void
    {
        $data = [
            'name' => 'My Site',
            'subdomain' => 'mysite',
            'description' => 12345,
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('description', $validator->errors()->toArray());
    }

    public function test_validation_passes_with_null_description(): void
    {
        $data = [
            'name' => 'My Site',
            'subdomain' => 'mysite',
            'description' => null,
        ];

        $request = new StoreSiteRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }
}

