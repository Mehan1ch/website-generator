<?php

use App\Http\Controllers\Api\V1\AvatarController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\DeploymentController;
use App\Http\Controllers\Api\V1\PageController;
use App\Http\Controllers\Api\V1\SchemaController;
use App\Http\Controllers\Api\V1\SiteController;
use App\Http\Controllers\Api\V1\UserController;
use App\Models\Page;
use App\Models\Site;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('/user', 'show');
    Route::delete('/user', 'destroy');
});

Route::controller(DashboardController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', 'index');
});

Route::controller(AvatarController::class)->middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::post('/avatar', 'store');
    Route::delete('/avatar', 'destroy');
});

Route::controller(SchemaController::class)->middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/schema', 'index')->can('view-any', Schema::class);
    Route::get('/schema/{schema}', 'show')->can('view', 'schema');
    Route::post('/schema', 'store')->can('create', Schema::class);
    Route::post('/schema/{schema}/publish', 'publish')->can('update', 'schema');
    Route::put('/schema/{schema}', 'update')->can('update', 'schema');
    Route::delete('/schema/{schema}', 'destroy')->can('delete', 'schema');
});

Route::controller(SiteController::class)->middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/site', 'index')->can('view-any', Site::class);
    Route::get('/site/{site}', 'show')->can('view', 'site')->can('view-any', Page::class);
    Route::post('/site', 'store')->can('create', Site::class);
    Route::put('/site/{site}', 'update')->can('update', 'site');
    Route::delete('/site/{site}', 'destroy')->can('delete', 'site');
});

Route::controller(PageController::class)->middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('site/{site}/page', 'index')->can('view-any', Page::class);
    Route::get('site/{site}/page/{page}', 'show')->can('view', 'page');
    Route::post('site/{site}/page', 'store')->can('create', Page::class);
    Route::put('site/{site}/page/{page}', 'update')->can('update', 'page');
    Route::delete('site/{site}/page/{page}', 'destroy')->can('delete', 'page');
});

Route::controller(DeploymentController::class)->middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/site/{site}/deployment', 'show')->can('view', 'site');
    Route::post('/site/{site}/deployment', 'store')->can('update', 'site');
    Route::put('/site/{site}/deployment', 'update')->can('update', 'site');
    Route::delete('/site/{site}/deployment', 'destroy')->can('update', 'site');
    Route::post('/site/{site}/deployment/restart', 'restart')->can('update', 'site');
});
