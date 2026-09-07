<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $name = Str::title(rtrim($this->faker->unique()->sentence(3), '.'));

        return [
            'name' => $name,
            'slug' => null,
            'summary' => $this->faker->sentence(12),
            'description' => $this->faker->paragraph(),
            'features' => $this->faker->sentences(3),
            'cta_label' => 'Konsultasikan Kebutuhan Anda',
            'sort_order' => $this->faker->numberBetween(0, 10),
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['is_active' => false]);
    }
}
