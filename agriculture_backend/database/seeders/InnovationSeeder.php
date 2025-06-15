<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class InnovationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 20; $i++) {
            DB::table('innovations')->insert([
                'id' => Str::uuid(),
                'innovation' => ucfirst($faker->words(3, true)),
                'inventor' => $faker->name,
                'image' => 'https://agricultureyhaddar.s3.us-east-2.amazonaws.com/innovations/irewolede-PvwdlXqo85k-unsplash.jpg',
                'description' => '<p>' . implode('</p><p>', $faker->paragraphs(3)) . '</p>',
                'date_creation' => $faker->date(),
                'user_id' => "2ecae7e2-0d79-4d3d-bc6e-cf66bde2756d",
                'impact' => "<p>Technology has significantly transformed the field of education, offering new ways for students to learn, interact, and grow academically. From online learning platforms to interactive digital classrooms, the integration of technology in education has introduced many benefits. Below are some of the major positive impacts:
  </p>

  <ul>
    <li>Improved access to education through online courses and resources</li>
    <li>Enhanced engagement with interactive learning tools</li>
    <li>Flexible learning schedules for students worldwide</li>
    <li>Availability of educational apps and e-books</li>
  </ul>

  <p>
    However, the integration of technology in education also brings some challenges that need to be addressed to ensure a balanced and effective learning experience. These challenges include:
  </p>

  <ol>
    <li>Digital divide: not all students have equal access to devices and internet</li>
    <li>Distraction due to non-educational online content</li>
    <li>Over-reliance on technology and reduced physical interaction</li>
    <li>Privacy and data security concerns in online platforms</li>
  </ol>

  <p>
    In conclusion, while technology has the potential to revolutionize education and make learning more accessible and engaging, it is important to address the challenges it presents. Educators and institutions must work together to create balanced strategies that incorporate technology effectively while ensuring no student is left behind.
  </p>",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
