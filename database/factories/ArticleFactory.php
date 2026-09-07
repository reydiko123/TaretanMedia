<?php

namespace Database\Factories;

use App\Enums\PublicationStatus;
use App\Models\Article;
use App\Models\Author;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Article>
 */
class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        $title = Str::title(rtrim($this->faker->unique()->sentence(5), '.'));

        return [
            'author_id' => Author::factory(),
            'title' => $title,
            'slug' => null,
            'excerpt' => $this->faker->sentence(15),
            'body' => '<p>'.$this->faker->paragraph().'</p><p>'.$this->faker->paragraph().'</p>',
            'featured_image_path' => null,
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
}
