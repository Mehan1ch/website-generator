<?php

namespace Database\Seeders;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Class TestSeeder
 * @package Database\Seeders
 * @description Seeder class to set up data for testing purposes.
 */
class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            RolesPermissionsSeeder::class,
        ]);

        // Create super admin user, change password after creation needed
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ])->assignRole(Roles::SUPER_ADMIN);
    }
}
