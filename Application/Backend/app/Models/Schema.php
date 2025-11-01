<?php

namespace App\Models;

use App\Casts\AsCompressedBase64;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * @property string $name
 * @property string|null $description
 * @property string|null $content
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
     * The attributes that should be cast.
     *
     * @var array<string, class-string>
     */
    protected $casts = [
        'content' => AsCompressedBase64::class,
    ];
}
