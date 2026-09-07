<?php

namespace App\Models;

use App\Enums\PublicationStatus;
use App\Models\Concerns\HasPublicationState;
use App\Models\Concerns\PublicationState;
use App\Support\SlugGenerator;
use Database\Factories\JournalFactory;
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
 * @property string|null $theme
 * @property string|null $edition_label
 * @property int|null $publication_year
 * @property string|null $cover_path
 * @property string|null $description
 * @property string $external_url
 * @property PublicationStatus $status
 * @property Carbon|null $published_at
 * @property Carbon|null $deleted_at
 * @property bool $is_featured
 */
class Journal extends Model
{
    use Concerns\LogsContentAudit;

    /** @use HasFactory<JournalFactory> */
    use HasFactory;

    use HasPublicationState;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'theme',
        'edition_label',
        'publication_year',
        'cover_path',
        'description',
        'external_url',
        'status',
        'published_at',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'publication_year' => 'integer',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
            'status' => PublicationStatus::class,
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Journal $journal): void {
            PublicationState::apply($journal);

            if (blank($journal->slug)) {
                $journal->slug = SlugGenerator::unique(static::class, $journal->title, $journal->id);
            }
        });

        static::forceDeleted(function (Journal $journal): void {
            if ($journal->cover_path && Storage::disk('public')->exists($journal->cover_path)) {
                Storage::disk('public')->delete($journal->cover_path);
            }
        });
    }

    /**
     * @return BelongsToMany<Category, $this>
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'journal_category');
    }
}
