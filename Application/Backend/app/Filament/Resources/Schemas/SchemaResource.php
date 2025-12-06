<?php

namespace App\Filament\Resources\Schemas;

use App\Filament\Resources\Schemas\Pages\CreateSchema;
use App\Filament\Resources\Schemas\Pages\EditSchema;
use App\Filament\Resources\Schemas\Pages\ListSchemas;
use App\Filament\Resources\Schemas\Pages\ViewSchema;
use App\Filament\Resources\Schemas\Schemas\SchemaForm;
use App\Filament\Resources\Schemas\Schemas\SchemaInfolist;
use App\Filament\Resources\Schemas\Tables\SchemasTable;
use App\Models\Schema as Schema1;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class SchemaResource extends Resource
{
    protected static ?string $model = Schema1::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::ClipboardDocument;

    protected static string|UnitEnum|null $navigationGroup = 'Site Management';

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return SchemaForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SchemaInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SchemasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSchemas::route('/'),
            'create' => CreateSchema::route('/create'),
            'view' => ViewSchema::route('/{record}'),
            'edit' => EditSchema::route('/{record}/edit'),
        ];
    }
}
