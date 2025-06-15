<?php

namespace Database\Seeders;

use AllowDynamicProperties;
use App\Models\Category;
use App\Models\heroComponent;
use App\Models\Service;
use Illuminate\Database\Seeder;

#[AllowDynamicProperties] class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

//        Category::factory(10)->create();
//        Service::factory(20)->create();
        $this->call([
//            ServicesSeeder::class,
//            heroComponentSeeder::class,
//            InnovationSeeder::class,
//            OurSeeder::class,
//            OurServiceSeeder::class,
//            SettingSeeder::class,
            AuthenticationSeeder::class,
        ]);
    }

}
