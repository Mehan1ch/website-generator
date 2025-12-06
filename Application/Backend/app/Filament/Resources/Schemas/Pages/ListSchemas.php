<?php

namespace App\Filament\Resources\Schemas\Pages;

use App\Filament\Resources\Schemas\SchemaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSchemas extends ListRecords
{
    protected static string $resource = SchemaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
