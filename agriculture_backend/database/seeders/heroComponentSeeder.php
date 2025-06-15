<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class heroComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "what is agriculture ?",
            "description" => "agriculture is the practice of cultivating the soil, growing crops, and raising livestock to produce food, fiber, medicinal plants, and other products that sustain and enhance human life. It is one of the oldest human activities and a cornerstone of civilization, providing the resources needed for societies to develop and thrive.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/home.png",
            "type" => "home",
        ]);

        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "blogs",
            "description" => "welcome to our agriculture blog, where we explore the fascinating world of farming, food production, and sustainable practices. Whether you're a seasoned farmer, an agribusiness enthusiast, or just curious about where your food comes from, we cover it all—crop cultivation, livestock management, agricultural innovations, and eco-friendly techniques. Join us as we share insights, success stories, and expert tips to help nurture a thriving agricultural community.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/blogs.png",
            "type" => "blogs",
        ]);

        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "news",
            "description" => "get the latest updates on agriculture, including new technologies, farming practices, market trends, and policies. This section covers innovations in precision farming, sustainable practices, crop yields, and more, helping farmers and agribusiness professionals stay informed about key developments shaping the future of food production.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/news.png",
            "type" => "news",
        ]);

        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "innovation",
            "description" => "get the latest updates on agriculture, including new technologies, farming practices, market trends, and policies. This section covers innovations in precision farming, sustainable practices, crop yields, and more, helping farmers and agribusiness professionals stay informed about key developments shaping the future of food production.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/innovation.png",
            "type" => "innovation",
        ]);

        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "courses",
            "description" => "Agriculture courses provide learners with knowledge and skills related to farming, sustainable practices, crop and livestock management, agribusiness, and agricultural technology. These courses, available online or in-person, cover topics like soil science, irrigation, pest control, organic farming, and modern innovations like precision agriculture. Designed for beginners to professionals, they often include practical training and certifications to enhance expertise in the agricultural sector.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/courses.png",
            "type" => "courses",
        ]);
        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "contact",
            "description" => "This page allows you to reach out to the administrator for any inquiries, feedback, or assistance you may need. Whether you have questions, want to report an issue, or share suggestions, feel free to use the provided contact form or communication channels. We’re here to help!",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/contact.png",
            "type" => "contact",
        ]);
        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "privacy policy",
            "description" => "This Privacy Policy explains how agriculture.com collects, uses, and protects your personal and agricultural data, such as farm details, crop types, and environmental data. We gather this information to optimize farming practices and improve productivity through technologies like IoT sensors and drones. We are committed to safeguarding your data and ensuring transparency. By using our services, you agree to this policy. Contact us for any questions or concerns.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/privacy_policy.png",
            "type" => "privacyPolicy",
        ]);
        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "faq",
            "description" => "The FAQ section for an agricultural project provides answers to common questions about the platform’s services, features, and data collection practices. It aims to assist users in understanding how the agricultural tools and technologies work, how they can benefit from them, and how to access and manage their farm data. The FAQ covers topics like:",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/faq.png",
            "type" => "faq",
        ]);
        DB::table('hero_components')->insert([
            "id" => Str::uuid(),
            "title" => "our Apps",
            "description" => "The \"Our Apps\" page introduces users to the suite of applications developed by agriculture.com to enhance your agricultural experience. Whether you’re managing a small farm or a large-scale operation, our apps are designed to streamline farm management, improve productivity, and offer real-time data for better decision-making.",
            "image" => "https://agricultureyhaddar.s3.us-east-2.amazonaws.com/heroComponent/our_apps.png",
            "type" => "ourApps",
        ]);


    }
}
