<?php

namespace App\Filament\Resources\Schemas\Pages;

use App\Filament\Resources\Schemas\SchemaResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditSchema extends EditRecord
{
    protected static string $resource = SchemaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['content'] = base64_encode(gzdeflate($data['content']));

        return $data;
    }
}
