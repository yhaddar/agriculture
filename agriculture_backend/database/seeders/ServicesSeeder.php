<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $userId = '2ecae7e2-0d79-4d3d-bc6e-cf66bde2756d';
        $blogCategoryId = ["29c70678-2d0e-11f0-a7d0-12a6f32a97b0", "3881cf02-2d0e-11f0-a7d0-12a6f32a97b0"];
        $newsCategoryId = ["953455db-2d0e-11f0-a7d0-12a6f32a97b0", "a261aded-2d0e-11f0-a7d0-12a6f32a97b0"];

        $entries = [];

        foreach (range(1, 40) as $i) {
            $isBlog = $i % 2 === 0;

            $entries[] = [
                'id' => Str::uuid(),
                'title' => $isBlog ? "Blog Title $i" : "News Headline $i",
                'description' => '<p>' . implode('</p><p>', $faker->paragraphs(3)) . '</p>',
                'image' => 'https://agricultureyhaddar.s3.us-east-2.amazonaws.com/blogs/steven-weeks-DUPFowqI6oI-unsplash.jpg',
                'user_id' => $userId,
                'category_id' => $isBlog ? $faker->randomElement($blogCategoryId) : $faker->randomElement($newsCategoryId),
                'service_type' => $isBlog ? 'BLOGS' : 'NEWS',
                'location' => $faker->city,
                'source' => $faker->url,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        DB::table('services')->insert($entries);

    }
}
