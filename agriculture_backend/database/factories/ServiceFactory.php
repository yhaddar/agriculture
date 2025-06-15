<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
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
            "title" => $this->faker->title(),
            "description" => $this->faker->randomElement(["
            <h1>The Importance of Healthy Eating for a Long and Fulfilling Life</h1>
            <p>Maintaining a <strong>healthy diet</strong> is one of the most crucial aspects of living a long, vibrant life. Proper nutrition not only helps you feel energized but also provides the necessary nutrients for your body to function optimally. The foods you consume can directly impact your physical, emotional, and mental well-being, reducing the risk of chronic diseases and promoting longevity.</p>
            <h2>Key Components of a Healthy Diet</h2>
            <p>A balanced diet includes a variety of different food groups. Here are some of the most important:</p>
            <ul>
                <li><strong>Fruits and Vegetables:</strong> These are essential for providing the body with the necessary vitamins, minerals, and antioxidants. Rich in fiber, they help maintain digestive health and reduce the risk of heart disease. Aim to consume at least five servings of fruits and vegetables every day.</li>
                <li><strong>Whole Grains:</strong> Whole grains like quinoa, oats, and brown rice are excellent sources of complex carbohydrates, providing steady energy throughout the day. They also contain essential nutrients such as fiber, iron, and B vitamins that support metabolic functions.</li>
                <li><strong>Lean Proteins:</strong> Proteins are vital for muscle repair and immune function. Lean sources such as chicken, fish, legumes, and nuts are healthy options. Protein also helps keep you feeling full longer, reducing unhealthy snacking.</li>
                <li><strong>Healthy Fats:</strong> Healthy fats, found in foods like avocados, olive oil, and nuts, are essential for brain function, hormone regulation, and heart health. Unlike saturated fats, these fats help reduce bad cholesterol and inflammation.</li>
                <li><strong>Dairy or Dairy Alternatives:</strong> Dairy products such as milk, yogurt, and cheese are rich in calcium and vitamin D, which are essential for strong bones and teeth. Non-dairy alternatives like almond milk or soy milk are also great options for those who are lactose intolerant.</li>
            </ul>
            <h2>Why Eating Healthy Matters</h2>
            <p>Eating a variety of healthy foods not only improves your body’s physical health but also has a significant impact on your mental health. A diet rich in <strong>whole foods</strong> such as fruits, vegetables, whole grains, and lean proteins supports cognitive function, mood stability, and overall mental clarity.</p>
            <p>Additionally, a healthy diet helps maintain <strong>weight management</strong>, supports your immune system, and reduces the risk of chronic conditions such as diabetes, hypertension, and obesity. Studies have shown that eating a nutritious diet can also improve <strong>mental health</strong>, reducing the risk of depression and anxiety.</p>
            <h3>Incorporating Healthy Eating into Your Lifestyle</h3>
            <p>Switching to a healthier eating plan doesn't have to be difficult. Start by making small changes to your meals, such as swapping processed foods for whole grains or adding more vegetables to your plate. Preparing meals at home allows you to control the ingredients, ensuring they are fresh and nutritious.</p>
            <p>It’s also important to stay hydrated, so be sure to drink plenty of water throughout the day. Avoid sugary drinks, as they can contribute to weight gain and an increased risk of type 2 diabetes. If you're trying to lose weight, make sure to monitor portion sizes and eat balanced meals that include proteins, healthy fats, and carbohydrates.</p>
            <h2>Conclusion</h2>
            <p>Overall, eating a balanced diet is crucial for achieving optimal health. The benefits of a healthy eating pattern extend beyond physical well-being to improve mental clarity, mood, and quality of life. By incorporating a variety of nutrient-dense foods into your daily meals and making conscious decisions about what you eat, you can enhance your long-term health and enjoy a better quality of life.</p>
        "]),
            "image" => "blog1.png",
            "user_id" => $this->faker->randomElement(["d699f946-abdc-4daf-98de-dbf559f45bce"]),
           "service_type" => $this->faker->randomElement(["BLOGS", "NEWS"]),
            "heroComponent_id" => $this->faker->randomElement(["0120f00c-4afd-411e-867d-1738c62be39e"]),
            "category_id" => $this->faker->randomElement(["10521589-9820-3be9-8045-0741cb38445c", "106c2b2c-2f10-39fb-9a55-ba0b409c8363"]),
            "location" => $this->faker->randomElement(["California - United States"]),
            "source" => $this->faker->randomElement(["The New York Times"])
        ];
    }
}
