<?php

namespace App\Filament\Resources\Schemas\Pages;

use App\Filament\Resources\Schemas\SchemaResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSchema extends CreateRecord
{
    protected static string $resource = SchemaResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['content'] = base64_encode(gzdeflate($data['content']));
        return $data;
    }
}
