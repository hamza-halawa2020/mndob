<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminDoctorResource;
use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\User;
use App\Models\users_and_doctors;
use Exception;
use Illuminate\Support\Facades\DB;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function index()
    {
        try {
            $doctors = Doctor::with('users_and_doctors', 'visiting', 'visitRates')->get();
            return AdminDoctorResource::collection($doctors);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function calculateTotalDoctorsForUsers($id)
    {
        try {
            $user = User::findOrFail($id);
            $totalDoctorsByUser = users_and_doctors::select(DB::raw('COUNT(*) as total_doctors'))
                ->where('user_id', $user->id)
                ->groupBy('user_id')
                ->get();
            return response()->json($totalDoctorsByUser, 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }



    public function show(string $id)
    {
        try {
            $doctor = Doctor::with('users_and_doctors', 'visiting', 'visitRates')->findOrFail($id);
            return new AdminDoctorResource($doctor);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function destroy(string $id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $doctor->delete();
            return response()->json(['message' => 'deleted'], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
}
