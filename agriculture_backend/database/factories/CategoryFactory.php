<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "id" => $this->faker->uuid(),
            "title" => $this->faker->title,
            "description" => $this->faker->paragraph(),
            "user_id" => "299da7a9-5636-4d62-a3d6-2ed187bb0dc3",
            "cover" => $this->faker->imageUrl(),
            "category_type" => $this->faker->randomElement(["news", "blogs"]),
        ];
    }
}
