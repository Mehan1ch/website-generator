<?php

namespace Tests\Feature\Controllers\Api\V1;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AvatarTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function test_authenticated_user_can_upload_avatar(): void
    {
        Storage::fake('media');

        $file = UploadedFile::fake()->image('avatar.jpg', 200, 200);

        $response = $this->actingAs($this->user)->postJson('/api/v1/avatar', [
            'avatar' => $file,
        ]);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Avatar uploaded successfully.']);
    }

    public function test_unauthenticated_user_cannot_upload_avatar(): void
    {
        Storage::fake('media');

        $file = UploadedFile::fake()->image('avatar.jpg', 200, 200);

        $response = $this->postJson('/api/v1/avatar', [
            'avatar' => $file,
        ]);

        $response->assertStatus(401);
    }

    public function test_unverified_user_cannot_upload_avatar(): void
    {
        Storage::fake('media');

        $unverifiedUser = User::factory()->unverified()->create();

        $file = UploadedFile::fake()->image('avatar.jpg', 200, 200);

        $response = $this->actingAs($unverifiedUser)->postJson('/api/v1/avatar', [
            'avatar' => $file,
        ]);

        $response->assertStatus(403);
    }

    public function test_avatar_upload_requires_image_file(): void
    {
        Storage::fake('media');

        $file = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->actingAs($this->user)->postJson('/api/v1/avatar', [
            'avatar' => $file,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['avatar']);
    }

    public function test_avatar_upload_validates_file_size(): void
    {
        Storage::fake('media');

        $file = UploadedFile::fake()->image('large-avatar.jpg')->size(3000);

        $response = $this->actingAs($this->user)->postJson('/api/v1/avatar', [
            'avatar' => $file,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['avatar']);
    }

    public function test_avatar_upload_validates_mime_type(): void
    {
        Storage::fake('media');

        $file = UploadedFile::fake()->create('avatar.bmp', 100, 'image/bmp');

        $response = $this->actingAs($this->user)->postJson('/api/v1/avatar', [
            'avatar' => $file,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['avatar']);
    }

    public function test_avatar_upload_accepts_valid_mime_types(): void
    {
        Storage::fake('media');

        $validTypes = ['jpeg', 'jpg', 'png', 'gif', 'webp'];

        foreach ($validTypes as $type) {
            $file = UploadedFile::fake()->image("avatar.$type", 200, 200);

            $response = $this->actingAs($this->user)->postJson('/api/v1/avatar', [
                'avatar' => $file,
            ]);

            $response->assertStatus(201);
        }
    }

    public function test_avatar_upload_requires_file(): void
    {
        $response = $this->actingAs($this->user)->postJson('/api/v1/avatar');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['avatar']);
    }

    public function test_authenticated_user_can_delete_avatar(): void
    {
        Storage::fake('media');

        $file = UploadedFile::fake()->image('avatar.jpg', 200, 200);
        $this->actingAs($this->user)->postJson('/api/v1/avatar', ['avatar' => $file]);

        $response = $this->actingAs($this->user)->deleteJson('/api/v1/avatar');

        $response->assertStatus(204);
    }

    public function test_unauthenticated_user_cannot_delete_avatar(): void
    {
        $response = $this->deleteJson('/api/v1/avatar');

        $response->assertStatus(401);
    }

    public function test_unverified_user_cannot_delete_avatar(): void
    {
        $unverifiedUser = User::factory()->unverified()->create();

        $response = $this->actingAs($unverifiedUser)->deleteJson('/api/v1/avatar');

        $response->assertStatus(403);
    }

    public function test_deleting_nonexistent_avatar_returns_success(): void
    {
        $response = $this->actingAs($this->user)->deleteJson('/api/v1/avatar');

        $response->assertStatus(204);
    }

    public function test_uploading_new_avatar_replaces_old_one(): void
    {
        Storage::fake('media');

        $file1 = UploadedFile::fake()->image('avatar1.jpg', 200, 200);
        $this->actingAs($this->user)->postJson('/api/v1/avatar', ['avatar' => $file1]);

        $file2 = UploadedFile::fake()->image('avatar2.jpg', 200, 200);
        $response = $this->actingAs($this->user)->postJson('/api/v1/avatar', ['avatar' => $file2]);

        $response->assertStatus(201);

        $this->user->refresh();
        $this->assertEquals(1, $this->user->getMedia('avatar')->count());
    }
}

