<?php

namespace Tests\Unit\Requests;

use App\Http\Requests\Api\V1\AvatarRequest;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

class AvatarRequestTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        Storage::fake('public');
    }

    public function test_authorize_returns_true_when_authenticated(): void
    {
        $this->actingAs($this->user);

        $request = new AvatarRequest();

        $this->assertTrue($request->authorize());
    }

    public function test_authorize_returns_false_when_not_authenticated(): void
    {
        $request = new AvatarRequest();

        $this->assertFalse($request->authorize());
    }

    public function test_validation_passes_with_valid_jpeg_image(): void
    {
        $file = UploadedFile::fake()->image('avatar.jpg');

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_valid_png_image(): void
    {
        $file = UploadedFile::fake()->image('avatar.png');

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_valid_gif_image(): void
    {
        $file = UploadedFile::fake()->image('avatar.gif');

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_valid_webp_image(): void
    {
        $file = UploadedFile::fake()->image('avatar.webp');

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_fails_when_avatar_is_missing(): void
    {
        $data = [];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('avatar', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_avatar_is_not_file(): void
    {
        $data = [
            'avatar' => 'not-a-file',
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('avatar', $validator->errors()->toArray());
    }

    public function test_validation_fails_with_non_image_file(): void
    {
        $file = UploadedFile::fake()->create('document.pdf', 1000);

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('avatar', $validator->errors()->toArray());
    }

    public function test_validation_fails_with_invalid_mime_type(): void
    {
        $file = UploadedFile::fake()->create('avatar.bmp', 1000, 'image/bmp');

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('avatar', $validator->errors()->toArray());
    }

    public function test_validation_fails_when_file_exceeds_max_size(): void
    {
        $file = UploadedFile::fake()->image('avatar.jpg')->size(2049); // 2049 KB > 2048 KB

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertTrue($validator->fails());
        $this->assertArrayHasKey('avatar', $validator->errors()->toArray());
    }

    public function test_validation_passes_when_file_is_at_max_size(): void
    {
        $file = UploadedFile::fake()->image('avatar.jpg')->size(2048); // Exactly 2048 KB

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }

    public function test_validation_passes_with_small_file(): void
    {
        $file = UploadedFile::fake()->image('avatar.jpg')->size(100); // 100 KB

        $data = [
            'avatar' => $file,
        ];

        $request = new AvatarRequest();
        $validator = Validator::make($data, $request->rules());

        $this->assertFalse($validator->fails());
    }
}

