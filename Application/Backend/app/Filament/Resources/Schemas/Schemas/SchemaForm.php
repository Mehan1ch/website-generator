<?php

namespace App\Filament\Resources\Schemas\Schemas;

use A909M\FilamentStateFusion\Forms\Components\StateFusionToggleButtons;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SchemaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                StateFusionToggleButtons::make('state')->required(),
                Textarea::make('content')
                    ->formatStateUsing(fn(?\App\Models\Schema $schema) => $schema?->contentReadable)
                    ->placeholder("")
                    ->columnSpanFull()
                    ->autosize(),
            ]);
    }
}
