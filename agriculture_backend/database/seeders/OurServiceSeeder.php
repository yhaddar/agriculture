<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OurServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Météo',
                'description' => 'Stay ahead of the weather with real-time forecasts, climate trends, and seasonal updates tailored for your region.',
                'image' => 'https://agricultureyhaddar.s3.us-east-2.amazonaws.com/ourService/cloudy.png',
            ],
            [
                'title' => 'Cours',
                'description' => 'Access a wide range of courses designed to improve your skills, from crop management and sustainable practices to modern farming technologies.',
                'image' => 'https://agricultureyhaddar.s3.us-east-2.amazonaws.com/ourService/courses.png',
            ],
            [
                'title' => 'Blogs',
                'description' => 'Discover expert articles, personal farming stories, and tips to inspire and guide your agricultural journey.',
                'image' => 'https://agricultureyhaddar.s3.us-east-2.amazonaws.com/ourService/blogs.png',
            ],
            [
                'title' => 'News',
                'description' => 'Keep up-to-date with the latest developments in agriculture, from policy changes to market trends and global advancements.',
                'image' => 'https://agricultureyhaddar.s3.us-east-2.amazonaws.com/ourService/news.png',
            ],
            [
                'title' => 'Innovation',
                'description' => 'Explore cutting-edge tools, techniques, and technologies revolutionizing the agricultural sector, helping you boost productivity and sustainability.',
                'image' => 'https://agricultureyhaddar.s3.us-east-2.amazonaws.com/ourService/innovations.png',
            ],
        ];

        foreach ($services as $service) {
            DB::table('our_services')->insert([
                'id' => Str::uuid(),
                'title' => $service['title'],
                'description' => $service['description'],
                'image' => $service['image'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
