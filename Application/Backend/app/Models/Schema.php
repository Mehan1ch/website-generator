<?php

namespace App\Models;

use App\States\Draft;
use App\States\Published;
use App\States\PublishingState;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Spatie\ModelStates\HasStates;
use Spatie\ModelStates\HasStatesContract;

/**
 * @property string $id
 * @property string $name
 * @property string|null $description
 * @property string|null $content
 * @property PublishingState $state
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $published_at
 * @property string $contentReadable
 */
class Schema extends Model implements HasStatesContract
{

    use HasFactory, HasUuids, HasStates;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'content',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array <string, class-string>
     */
    protected $casts = [
        'state' => PublishingState::class,
    ];

    protected static function boot(): void
    {
        parent::boot();


        static::updated(function (Schema $schema) {
            if ($schema->isDirty(['name', 'content', 'description']) && $schema->state->equals(Published::class)) {
                $schema->state->transitionTo(Draft::class);
            }
        });
    }

    /**
     * Get the content attribute in a readable format.
     *
     * @return Attribute<string>
     */
    public function contentReadable(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->content === null ? null : gzinflate(base64_decode($this->content)),
            set: fn(string $value) => $this->content = base64_encode(gzdeflate($value))
        );
    }
}
