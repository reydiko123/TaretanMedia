<?php

namespace App\Models;

use App\Enums\PublicationStatus;
use App\Models\Concerns\HasPublicationState;
use App\Models\Concerns\PublicationState;
use App\Support\SlugGenerator;
use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $isbn
 * @property string|null $publisher
 * @property int|null $publication_year
 * @property int|null $page_count
 * @property int $price
 * @property string|null $cover_path
 * @property string|null $synopsis
 * @property string|null $table_of_contents
 * @property PublicationStatus $status
 * @property Carbon|null $published_at
 * @property Carbon|null $deleted_at
 * @property bool $is_featured
 */
class Book extends Model
{
    use Concerns\LogsContentAudit;

    /** @use HasFactory<BookFactory> */
    use HasFactory;

    use HasPublicationState;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'isbn',
        'publisher',
        'publication_year',
        'page_count',
        'price',
        'cover_path',
        'synopsis',
        'table_of_contents',
        'status',
        'published_at',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'publication_year' => 'integer',
            'page_count' => 'integer',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
            'status' => PublicationStatus::class,
        ];
    }

    /**
     * Normalise ISBN: strip spaces/hyphens, uppercase (ISBN-10 "X").
     * Empty becomes null so nullable-unique semantics hold (plan §5.11).
     *
     * @return Attribute<string|null, string|null>
     */
    protected function isbn(): Attribute
    {
        return Attribute::make(
            set: function (?string $value): ?string {
                if ($value === null) {
                    return null;
                }

                $normalized = strtoupper(preg_replace('/[\s-]+/', '', $value) ?? '');

                return $normalized === '' ? null : $normalized;
            },
        );
    }

    protected static function booted(): void
    {
        static::saving(function (Book $book): void {
            PublicationState::apply($book);

            if (blank($book->slug)) {
                $book->slug = SlugGenerator::unique(static::class, $book->title, $book->id);
            }
        });

        static::forceDeleted(function (Book $book): void {
            if ($book->cover_path && Storage::disk('public')->exists($book->cover_path)) {
                Storage::disk('public')->delete($book->cover_path);
            }
        });
    }

    /**
     * @return BelongsToMany<Author, $this>
     */
    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class)
            ->withPivot('sort_order')
            ->withTimestamps()
            ->orderBy('author_book.sort_order');
    }

    /**
     * @return BelongsToMany<Category, $this>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }
}
