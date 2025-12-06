<?php

namespace App\Enums;

use BackedEnum;
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasDescription;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

enum Roles: string implements HasLabel, HasColor, HasDescription, HasIcon
{
    case USER = 'user';
    case ADMIN = 'admin';
    case SUPER_ADMIN = 'super_admin';

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::USER => 'green',
            self::ADMIN => 'blue',
            self::SUPER_ADMIN => 'red',
        };
    }

    public function getDescription(): string|Htmlable|null
    {
        return match ($this) {
            self::USER => 'Regular users with standard access.',
            self::ADMIN => 'Administrators with elevated privileges.',
            self::SUPER_ADMIN => 'Super administrators with full access.',
        };
    }

    public function getIcon(): string|BackedEnum|null
    {
        return match ($this) {
            self::USER => 'heroicon-o-user',
            self::ADMIN => 'heroicon-o-shield-check',
            self::SUPER_ADMIN => 'heroicon-o-crown',
        };
    }

    public function getLabel(): string|Htmlable|null
    {
        return match ($this) {
            self::USER => 'User',
            self::ADMIN => 'Admin',
            self::SUPER_ADMIN => 'Super Admin',
        };
    }
}

