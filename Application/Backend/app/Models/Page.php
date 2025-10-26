<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string $title
 * @property string $url
 * @property string $content
 * @property int $site_id
 * @property-read Site $site
 */
class Page extends Model
{

    use SoftDeletes, Prunable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'url',
        'content',
        'site_id',
    ];

    /**
     * Get the site that owns the page.
     *
     * @return BelongsTo<Site>
     */
    public function site(): BelongsTo
    {
        return $this->belongsTo(Site::class);
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
