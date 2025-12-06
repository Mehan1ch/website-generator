<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable event listeners to prevent side effects during seeding
        Page::flushEventListeners();
        Page::factory()->count(fake()->numberBetween(50, 100))->create();
    }
}
