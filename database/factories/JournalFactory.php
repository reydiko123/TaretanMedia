<?php

namespace Database\Factories;

use App\Enums\PublicationStatus;
use App\Models\Journal;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Journal>
 */
class JournalFactory extends Factory
{
    protected $model = Journal::class;

    public function definition(): array
    {
        $title = Str::title(rtrim($this->faker->unique()->sentence(3), '.'));

        return [
            'title' => $title,
            'slug' => null,
            'theme' => Str::title(rtrim($this->faker->sentence(2), '.')),
            'edition_label' => 'Edisi '.$this->faker->numberBetween(1, 20),
            'publication_year' => $this->faker->numberBetween(2000, 2026),
            'cover_path' => null,
            'description' => $this->faker->paragraph(),
            'external_url' => 'https://'.$this->faker->domainName().'/'.Str::slug($title),
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
