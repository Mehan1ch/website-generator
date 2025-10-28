<?php

namespace Database\Seeders;

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class RolesPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        foreach (Permissions::cases() as $permission) {
            Permission::create(['name' => $permission->value]);
        }


        // Update cache to know about the newly created permissions (required if using WithoutModelEvents in seeders)
        app()[PermissionRegistrar::class]->forgetCachedPermissions();


        $adminOnlyPermissions = [
            Permissions::VIEW_ANY_USERS->value,
            Permissions::DELETE_USERS->value,
            Permissions::RESTORE_USERS->value,
            Permissions::FORCE_DELETE_USERS->value,
            Permissions::CREATE_SCHEMAS->value,
            Permissions::UPDATE_SCHEMAS->value,
            Permissions::DELETE_SCHEMAS->value,
            Permissions::RESTORE_SCHEMAS->value,
            Permissions::FORCE_DELETE_SCHEMAS->value,
        ];

        $allPermissionValues = array_map(
            fn(Permissions $permission): string => $permission->value,
            Permissions::cases()
        );

        $regularPermissions = array_values(array_diff($allPermissionValues, $adminOnlyPermissions));

        foreach (Roles::cases() as $role) {
            $roleInstance = Role::create(['name' => $role->value]);
            switch ($role) {
                case ROLES::USER:
                    $roleInstance->givePermissionTo($regularPermissions);
                    break;
                case ROLES::ADMIN:
                    $roleInstance->givePermissionTo(Permissions::cases());
                    break;
                case Roles::SUPER_ADMIN:
                    break;
            };
        }
    }
}
