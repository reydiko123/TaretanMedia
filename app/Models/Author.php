<?php

namespace App\Models;

use App\Models\Concerns\LogsContentAudit;
use Database\Factories\AuthorFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string|null $about
 */
class Author extends Model
{
    /** @use HasFactory<AuthorFactory> */
    use HasFactory;

    use LogsContentAudit;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'about',
    ];

    /**
     * Books written by this author, ordered by pivot sort_order.
     *
     * @return BelongsToMany<Book, $this>
     */
    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class)
            ->withPivot('sort_order')
            ->withTimestamps()
            ->orderBy('author_book.sort_order');
    }

    /**
     * Articles authored by this author.
     *
     * @return HasMany<Article, $this>
     */
    public function articles(): HasMany
    {
        return $this->hasMany(Article::class);
    }
}
