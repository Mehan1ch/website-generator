<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

/**
 * @property string $name
 * @property string|null $description
 * @property string|null $content
 */
class Schema extends Model
{

    use SoftDeletes, Prunable;

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
     * Get the prunable model query.
     *
     * @return Builder<int, static>
     */
    public function prunable(): Builder
    {
        return static::where('deleted_at', '<=', now()->subMonth());
    }
}
