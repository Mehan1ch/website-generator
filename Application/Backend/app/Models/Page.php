<?php

namespace App\Models;

use App\States\Draft;
use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use LZCompressor\LZString;
use Spatie\MediaLibrary\MediaCollections\File;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * @property string $id
 * @property string $title
 * @property string $url
 * @property string $content
 * @property-read string $contentReadable
 * @property int $site_id
 * @property-read Site $site
 * @property-read Media|null $staticHTML
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
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

    protected static function boot(): void
    {
        parent::boot();

        static::created(function (Page $page) {
            $page->site->state->transitionTo(Draft::class);
        });

        static::updating(function (Page $page) {
            $page->site->state->transitionTo(Draft::class);

            if (!$page->isDirty('url')) {
                return;
            }
            // Prevent changing the homepage URL
            if ($page->getOriginal('url') === "/" && $page->url !== "/") {
                throw new Exception("The homepage URL '/' cannot be changed to a different URL.");
            }
        });

        static::deleting(function ($page) {
            $page->clearMediaCollection('static_html');
        });
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
            get: function (): ?string {
                $url = $this->getFirstMedia('static_html')?->getUrl();

                if ($url === null) {
                    return null;
                }

                $base = config('filesystems.disks.s3.url', '');

                if ($base !== '' && str_starts_with($url, $base)) {
                    return substr($url, strlen($base));
                }

                return $url;
            }
        );
    }

    /**
     * Get the content attribute in a readable format.
     *
     * @return Attribute<string>
     */
    public function contentReadable(): Attribute
    {
        return Attribute::make(
            get: fn() => LZString::decompressFromBase64($this->content),
            set: fn(string $value) => $this->content = LZString::compressToBase64($value)
        );
    }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('static_html')
            ->singleFile()
            ->acceptsFile(function (File $file) {
                return $file->mimeType === 'text/html';
            });;
    }
}
