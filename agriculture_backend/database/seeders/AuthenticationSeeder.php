<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthenticationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for($i = 0; $i < 10; $i++) {
            DB::table("authentications")->insert([
                "id" => Str::uuid(),
                "full_name" => $faker->firstName.' '.$faker->lastName,
                "email" => $faker->email,
                "email_verified_at" => now(),
                "password" => Hash::make("password123@"),
                "profile" => "profile.png",
                "role" => $faker->randomElement(["admin", "agricultor"]),
                "is_accept_privacy_policy" => true,
                "type" => "oauth",
                "created_at" => now(),
                "updated_at" => now(),
            ]);
        }

    }
}
