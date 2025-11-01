<?php

namespace App\Models;

use App\Casts\AsCompressedBase64;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\MediaCollections\File;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property string $title
 * @property string $url
 * @property string $content
 * @property int $site_id
 * @property-read Site $site
 * @property-read Media|null $staticHTML
 */
class Page extends Model implements HasMedia
{
    use HasFactory, HasUuids, InteractsWithMedia;

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

    protected static function boot(): void
    {
        parent::boot();
        // TODO: enable site state transition on page create/update when versioning is sorted out
        /**
         * static::creating(function (Page $model) {
         * $site = $model->site;
         * $site->state->transitionTo(Draft::class);
         * });
         *
         * static::updating(function (Page $model) {
         * $site = $model->site;
         * $site->state->transitionTo(Draft::class);
         * });
         */
    }

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
     * Get the static page media.
     *
     * @return Attribute<Media>
     */
    public function staticHTML(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getFirstMedia('static_html')
        );
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('static_html')
            ->acceptsFile(function (File $file) {
                return $file->mimeType === 'text/html';
            });;
    }
}
