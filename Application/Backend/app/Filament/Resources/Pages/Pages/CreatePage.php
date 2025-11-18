<?php

namespace App\Filament\Resources\Pages\Pages;

use App\Filament\Resources\Pages\PageResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePage extends CreateRecord
{
    protected static string $resource = PageResource::class;


    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['content'] = base64_encode(gzdeflate($data['content']));
        return $data;
    }
}
