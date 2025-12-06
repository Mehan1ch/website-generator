<?php

namespace Database\Seeders;

use App\Models\Schema;
use Illuminate\Database\Seeder;

class SchemaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::factory()->count(fake()->numberBetween(15, 50))->create();
    }
}
