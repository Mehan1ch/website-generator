<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property string $id
 * @property string $name
 * @property string|null $description
 * @property string|null $content
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $contentReadable
 */
class Schema extends Model
{

    use HasFactory, HasUuids;

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
