<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\heroComponent>
 */
class heroComponentFactory extends Factory
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
            "title" => $this->faker->randomElement(["blogs", "news", "innovation", "courses"]),
            "description" => $this->faker->paragraph(),
            "image" => $this->faker->randomElement(["blogs.png", "courses.png", "innovation.png", "news.png"]),
            "type" => $this->faker->unique()->randomElement(["blogs", "news", "innovation", "courses"]),
        ];
    }
}
