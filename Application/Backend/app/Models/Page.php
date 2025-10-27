<?php

namespace App\Models;

use App\Casts\AsCompressedBase64;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $title
 * @property string $url
 * @property string $content
 * @property int $site_id
 * @property-read Site $site
 */
class Page extends Model
{

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
     * The attributes that should be cast.
     *
     * @var array<string, class-string>
     */
    protected $casts = [
        'content' => AsCompressedBase64::class,
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
}
