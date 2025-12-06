<?php

namespace App\Filament\Resources\Sites\RelationManagers;

use App\Filament\Resources\Pages\PageResource;
use Filament\Actions\CreateAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;

class PagesRelationManager extends RelationManager
{
    protected static string $relationship = 'pages';

    protected static ?string $relatedResource = PageResource::class;

    public function table(Table $table): Table
    {
        return $table
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}
