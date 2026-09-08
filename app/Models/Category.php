<?php

namespace App\Models;

use App\Enums\CategoryType;
use App\Support\SlugGenerator;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property CategoryType $type
 */
class Category extends Model
{
    use Concerns\LogsContentAudit;

    /** @use HasFactory<CategoryFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'type' => CategoryType::class,
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Category $category): void {
            if (blank($category->slug)) {
                $category->slug = SlugGenerator::unique(static::class, $category->name, $category->id);
            }
        });
    }

    /**
     * @return BelongsToMany<Book, $this>
     */
    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class);
    }

    /**
     * @return BelongsToMany<Journal, $this>
     */
    public function journals(): BelongsToMany
    {
        return $this->belongsToMany(Journal::class, 'journal_category');
    }

    /**
     * @return BelongsToMany<Article, $this>
     */
    public function articles(): BelongsToMany
    {
        return $this->belongsToMany(Article::class, 'article_category');
    }
}
