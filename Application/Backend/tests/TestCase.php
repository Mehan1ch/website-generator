<?php

namespace Tests;

use Database\Seeders\RolesPermissionsSeeder;
use Database\Seeders\TestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;

    /**
     * Indicates whether the default or specified seeder should run before each test.
     */
    protected bool $seed = true;

    /**
     * Run a specific seeder before each test.
     */
    protected string $seeder = RolesPermissionsSeeder::class;
}
