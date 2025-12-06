<?php

namespace App\Filament\Resources\Schemas\Schemas;

use A909M\FilamentStateFusion\Forms\Components\StateFusionToggleButtons;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class SchemaInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('id')
                    ->label('ID'),
                TextEntry::make('name'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('contentReadable')
                    ->label("Content")
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('state')->badge(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
