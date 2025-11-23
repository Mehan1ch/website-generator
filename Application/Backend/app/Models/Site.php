<?php

namespace App\Models;

use App\States\Draft;
use App\States\PublishingState;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Spatie\ModelStates\HasStates;
use Spatie\ModelStates\HasStatesContract;

/**
 * @property string $id
 * @property string $name
 * @property string $subdomain
 * @property string|null $description
 * @property int $user_id
 * @property PublishingState $state
 * @property-read User $user
 * @property-read Collection<int, Page> $pages
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $published_at
 */
class Site extends Model implements HasStatesContract
{

    use HasStates, HasFactory, HasUuids;

    // use SoftDeletes, Prunable, Versionable; // TODO: Uncomment to enable soft deletes, pruning, and versioning
    // protected $versionStrategy = VersionStrategy::SNAPSHOT;
    // public string $versionModel = SiteVersion::class;

    /**
     * Versionable attributes
     *
     * @var array
     */
//    protected $versionable = ['name', 'subdomain', 'description'];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'subdomain',
        'description',
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

        static::created(function (Site $site) {

            $site->pages()->create([
                'title' => 'Home',
                'url' => '/',
            ]);
        });

        static::updating(function (Site $site) {
            // Only transition to Draft state if certain attributes have changed, others are automatic
            if ($site->isDirty(['name', 'subdomain', 'description'])) {
                $site->state->transitionTo(Draft::class);
            }
        });

        static::deleting(function ($site) {
            $site->pages()->delete();
        });
    }

    /**
     * Get the user that owns the site.
     *
     * @return BelongsTo<User>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the pages for the site.
     *
     * @return HasMany<Page>
     */
    public function pages(): HasMany
    {
        return $this->hasMany(Page::class);
    }

    /**
     * Get the prunable model query.
     *
     * @return Builder<int, static>
     */
//    public function prunable(): Builder
//    {
//        return static::where('deleted_at', '<=', now()->subMonth());
//    }
}
