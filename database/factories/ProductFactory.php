<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement([
            'E-book Panduan Digital Marketing',
            'Template Website Landing Page',
            'Kumpulan Font Premium',
            'Stock Photo Bundle',
            'Video Tutorial Photoshop',
            'Plugin WordPress Premium',
            'Template Presentasi Bisnis',
            'Panduan Dropshipping Lengkap',
            'E-book Resep Masakan',
            'Template CV Modern'
        ]);

        return [
            'name' => $name,
            'description' => $this->faker->paragraphs(3, true),
            'price' => $this->faker->randomFloat(2, 50000, 500000),
            'slug' => Str::slug($name),
            'is_active' => $this->faker->boolean(80),
            'file_path' => null, // Will be set separately if needed
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the product is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}