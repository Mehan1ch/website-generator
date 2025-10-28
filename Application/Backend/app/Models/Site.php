<?php

namespace App\Models;

use App\States\SiteState;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Overtrue\LaravelVersionable\Versionable;
use Overtrue\LaravelVersionable\VersionStrategy;
use Spatie\ModelStates\HasStates;

/**
 * @property string $name
 * @property string $subdomain
 * @property string|null $description
 * @property int $user_id
 * @property-read User $users
 * @property-read Collection<int, Page> $pages
 */
class Site extends Model
{

    use SoftDeletes, Prunable, Versionable, HasStates;

    protected $versionStrategy = VersionStrategy::SNAPSHOT;
    public string $versionModel = SiteVersion::class;

    /**
     * Versionable attributes
     *
     * @var array
     */
    protected $versionable = ['name', 'subdomain', 'description'];

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
        'state' => SiteState::class,
    ];

    /**
     * Get the user that owns the site.
     *
     * @return BelongsTo<User>
     */
    public function users(): BelongsTo
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
    public function prunable(): Builder
    {
        return static::where('deleted_at', '<=', now()->subMonth());
    }
}
