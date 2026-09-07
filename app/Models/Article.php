<?php

namespace App\Models;

use App\Enums\PublicationStatus;
use App\Models\Concerns\HasPublicationState;
use App\Models\Concerns\PublicationState;
use App\Support\HtmlSanitizer;
use App\Support\SlugGenerator;
use Database\Factories\ArticleFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int $author_id
 * @property string $title
 * @property string $slug
 * @property string|null $excerpt
 * @property string $body
 * @property string|null $featured_image_path
 * @property PublicationStatus $status
 * @property Carbon|null $published_at
 * @property Carbon|null $deleted_at
 * @property bool $is_featured
 */
class Article extends Model
{
    use Concerns\LogsContentAudit;

    /** @use HasFactory<ArticleFactory> */
    use HasFactory;

    use HasPublicationState;
    use SoftDeletes;

    protected $fillable = [
        'author_id',
        'title',
        'slug',
        'excerpt',
        'body',
        'featured_image_path',
        'status',
        'published_at',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
            'status' => PublicationStatus::class,
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Article $article): void {
            PublicationState::apply($article);

            if (blank($article->slug)) {
                $article->slug = SlugGenerator::unique(static::class, $article->title, $article->id);
            }

            // Sanitise rich text at the persistence boundary (plan §7.9, R-04).
            if ($article->isDirty('body')) {
                $article->body = HtmlSanitizer::article($article->body);
            }
        });

        static::forceDeleted(function (Article $article): void {
            if ($article->featured_image_path && Storage::disk('public')->exists($article->featured_image_path)) {
                Storage::disk('public')->delete($article->featured_image_path);
            }
        });
    }

    /**
     * @return BelongsTo<Author, $this>
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    /**
     * @return BelongsToMany<Category, $this>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'article_category');
    }
}
