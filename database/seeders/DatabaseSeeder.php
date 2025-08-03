<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\PaymentLink;
use App\Models\PaymentProof;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin PayLink',
            'email' => 'admin@paylink.com',
        ]);

        // Create sample products
        $products = Product::factory(10)->create();

        // Create sample payment links
        $paymentLinks = PaymentLink::factory(15)->create();

        // Create some payment proofs
        PaymentProof::factory(8)->pending()->create();
        PaymentProof::factory(5)->approved()->create();
        PaymentProof::factory(2)->rejected()->create();
    }
}
