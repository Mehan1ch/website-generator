<?php

namespace App\Enums;

enum RolesEnum: string
{
    case USER = 'user';
    case ADMIN = 'admin';
    case SUPER_ADMIN = 'super_admin';

    public function label(): string
    {
        return match ($this) {
            RolesEnum::USER => 'Users',
            RolesEnum::ADMIN => 'Administrators',
            RolesEnum::SUPER_ADMIN => 'Super Administrators',
        };
    }
}

