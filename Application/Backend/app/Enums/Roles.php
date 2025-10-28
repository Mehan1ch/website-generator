<?php

namespace App\Enums;

enum Roles: string
{
    case USER = 'user';
    case ADMIN = 'admin';
    case SUPER_ADMIN = 'super_admin';

    public function label(): string
    {
        return match ($this) {
            Roles::USER => 'Users',
            Roles::ADMIN => 'Administrators',
            Roles::SUPER_ADMIN => 'Super Administrators',
        };
    }
}

