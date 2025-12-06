<?php

namespace App\Filament\Resources\Pages\Schemas;

use App\Models\Page;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Validation\Rules\Unique;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('url')
                    ->startsWith("/")
                    ->unique(modifyRuleUsing: function (Unique $rule, Get $get) {
                        return $rule->where('site_id', $get('site_id') ?? null);
                    })
                    ->required(),
                Textarea::make('content')
                    ->formatStateUsing(fn(?Page $page) => $page?->contentReadable)
                    ->placeholder("")
                    ->columnSpanFull()
                    ->autosize(),
                Select::make('site_id')
                    ->relationship('site', 'name')
                    ->searchable()
                    ->required(),
            ]);
    }
}
