<?php

use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\GovernateController;
use App\Http\Controllers\Api\VisitingController;
use App\Http\Controllers\Api\VisitRateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('users', UserController::class);
Route::apiResource('governates', GovernateController::class);
Route::apiResource('doctors', DoctorController::class);
Route::apiResource('visit_rates', VisitRateController::class);
Route::apiResource('visits', VisitingController::class);
