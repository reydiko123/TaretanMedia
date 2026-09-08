<?php

namespace App\Models;

use App\Support\SlugGenerator;
use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $summary
 * @property string|null $description
 * @property array<int, string>|null $features
 * @property string|null $cta_label
 * @property int $sort_order
 * @property bool $is_active
 */
class Service extends Model
{
    use Concerns\LogsContentAudit;

    /** @use HasFactory<ServiceFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'summary',
        'description',
        'features',
        'cta_label',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Service $service): void {
            if (blank($service->slug)) {
                $service->slug = SlugGenerator::unique(static::class, $service->name, $service->id);
            }
        });
    }

    /**
     * Scope to active services, ordered for public display.
     *
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)->orderBy('sort_order');
    }
}
