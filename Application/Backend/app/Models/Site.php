<?php

namespace App\Models;

use App\States\Draft;
use App\States\SiteState;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Spatie\ModelStates\HasStates;
use Spatie\ModelStates\HasStatesContract;

/**
 * @property string $id
 * @property string $name
 * @property string $subdomain
 * @property string|null $description
 * @property int $user_id
 * @property SiteState $state
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
        'published_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array <string, class-string>
     */
    protected $casts = [
        'state' => SiteState::class,
    ];

    protected static function boot(): void
    {
        parent::boot();

        //TODO: this has to be rethought
        /*
        static::updating(function (Site $site) {
            Log::warning("óó");
            $site->state->transitionTo(Draft::class);
        });*/

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
