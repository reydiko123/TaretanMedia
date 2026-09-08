<?php

namespace Database\Factories;

use App\Enums\PublicationStatus;
use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
        $title = Str::title(rtrim($this->faker->unique()->sentence(4), '.'));

        return [
            'title' => $title,
            'slug' => null,
            'isbn_display' => $this->faker->boolean(70) ? $this->faker->isbn13() : null,
            'publisher' => $this->faker->company(),
            'publication_year' => $this->faker->numberBetween(2000, 2026),
            'page_count' => $this->faker->numberBetween(40, 600),
            'price' => $this->faker->numberBetween(25_000, 250_000),
            'cover_path' => null,
            'synopsis' => $this->faker->paragraph(),
            'table_of_contents' => $this->faker->paragraph(),
            'status' => PublicationStatus::Draft->value,
            'published_at' => null,
            'is_featured' => false,
        ];
    }

    public function published(): static
    {
        return $this->state(fn () => [
            'status' => PublicationStatus::Published->value,
            'published_at' => now()->subDays($this->faker->numberBetween(1, 120)),
        ]);
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }

    public function trashed(): static
    {
        return $this->state(fn () => ['deleted_at' => now()]);
    }
}
