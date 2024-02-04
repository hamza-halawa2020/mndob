<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GovernateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $governateData = [
            'Cairo' => 'القاهرة',
            'Giza' => 'الجيزة',
            'Beni Sueif' => 'بني سويف',
            'Luxor' => 'الأقصر',
            'Aswan' => 'أسوان',
            'Assiut' => 'أسيوط',
            'Sohag' => 'سوهاج',
            'Qena' => 'قنا',
            'El Minya' => 'المنيا',
            'El Fayoum' => 'الفيوم',
        ];

        // shuffle($governateData);

        $randomEnglishName = $this->faker->unique()->randomElement(array_keys($governateData));

        return [
            'name_en' => $randomEnglishName,
            'name_ar' => $governateData[$randomEnglishName],
        ];
    }
}
