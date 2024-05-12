<?php
use App\Http\Controllers\Admin\DoctorController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VisitingController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('admin-login', [AuthController::class, 'adminLogin']);

Route::apiResource('doctors', DoctorController::class);
Route::get('total-doctors/{id}', [DoctorController::class,'calculateTotalDoctorsForUsers']);


Route::apiResource('visits', VisitingController::class);
Route::get('visit/{id}', [VisitingController::class, 'ShowVisitForEveryUser']);
Route::get('visit-date/{id}', [VisitingController::class, 'showVisitByDate']);
Route::get('visit-date/{date}/user/{userId}', [VisitingController::class, 'showVisitByDateForOneUser']);
Route::get('visit-month/{year}/{month}/user/{userId}', [VisitingController::class, 'showVisitByMonthForOneUser']);
Route::delete('visit-delete/{id}', [VisitingController::class, 'destroy']);
Route::get('calculate-total-doctors-for-month/{year}/{month}', [VisitingController::class, 'calculateTotalDoctorsForMonth']);
Route::get('calculate-total-doctors-for-month/{year}/{month}/{id}', [VisitingController::class, 'calculateTotalDoctorsForMonthOneUser']);


Route::apiResource('users', UserController::class);
Route::get('profile', [UserController::class, 'profile']);
