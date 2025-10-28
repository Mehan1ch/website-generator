<?php

namespace Tests\Unit;

use App\Casts\AsCompressedBase64;
use App\Enums\EditorContentExample;
use Illuminate\Database\Eloquent\Model;
use PHPUnit\Framework\TestCase;

class AsCompressedBase64CastTest extends TestCase
{
    private string $encoded;
    private string $original;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    public function setUp(): void
    {
        parent::setUp();
        $this->encoded = EditorContentExample::ENCODED->value;
        $this->original = EditorContentExample::ORIGINAL->value;
    }

    /**
     * Test that the get method decompresses a frontend string.
     *
     * @return void
     */
    public function test_get_decompresses_frontend_string(): void
    {
        $cast = new AsCompressedBase64();
        $model = new class extends Model {
        };
        $result = $cast->get($model, 'content', $this->encoded, []);
        $this->assertSame($this->original, $result);
    }

    /**
     * Test that the set method encodes a frontend string.
     *
     * @return void
     */
    public function test_set_encodes_frontend_string(): void
    {
        $cast = new AsCompressedBase64();
        $model = new class extends Model {
        };
        $result = $cast->set($model, 'content', $this->original, []);
        $this->assertSame($this->encoded, $result);
    }

    /**
     * Test that setting and getting a value results in the original value.
     *
     * @return void
     */
    public function test_set_and_get_round_trip(): void
    {
        $cast = new AsCompressedBase64();
        $model = new class extends Model {
        };

        $stored = $cast->set($model, 'content', $this->original, []);
        $roundTrip = $cast->get($model, 'content', $stored, []);
        $this->assertSame($this->original, $roundTrip);
    }
}
