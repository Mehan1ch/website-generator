<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $frontendUrl = config('app.frontend_url');
    return redirect()->away($frontendUrl);
});
