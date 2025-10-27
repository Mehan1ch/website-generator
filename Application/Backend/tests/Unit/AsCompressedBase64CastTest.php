<?php

namespace Tests\Unit;

use App\Casts\AsCompressedBase64;
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
        $encoded = 'N4IgSg8hAqIFygC4E8AOBTeoBO6DOA9gDYBu6AJgHICGAtpnCAKLkCWiB2AwgQHaLVWvdNhABfADQhWeLtV4lqeeImwBXdFNTYCqZQhAAjagGMA1gHMda3uXggAxOmcgt1cm14X4AVkkg2PFQiamQaensWdk4efkFhUSkTNTwOWix/AAtWD3ReeAAzaiI8TRBeAnJ8eABtEAB1AE0AQQArAFlkAgAFAEcAWhAAXSkiITMKSkrqhDF/JrbOnoGsEBQMVdxCUkm6BmY2DmxodAAPRHEpGTkFJULi0q0dPVXEM4vGAAl0IiICAAIAO6cIjkACErhABT4iAAyqwAF4MABMAAZ/IFgqFwvsokcTudIclUgR0rM3Lh+PZIDBIdlcvk4EUSmUKlV9DURiAxrwJlRpvpgHMxEA==';
        $original = '{"ROOT":{"type":{"resolvedName":"EditorContainer"},"isCanvas":true,"props":{"background":"#eee","padding":5},"displayName":"EditorContainer","custom":{},"hidden":false,"nodes":["WYAjMyoPq-"],"linkedNodes":{}},"WYAjMyoPq-":{"type":{"resolvedName":"EditorText"},"isCanvas":false,"props":{"text":"Hello world!","fontSize":20},"displayName":"EditorText","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}';
        $this->encoded = $encoded;
        $this->original = $original;
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
