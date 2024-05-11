<?php
use App\Http\Controllers\Admin\DoctorController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Admin\AuthController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('admin-login', [AuthController::class, 'adminLogin']);
Route::apiResource('doctors', DoctorController::class);
