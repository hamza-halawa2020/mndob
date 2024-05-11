<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminDoctorResource;
use Illuminate\Http\Request;
use App\Models\Doctor;
use Exception;


class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    public function index(Request $request)
    {
        try {
            $doctors = Doctor::with('users_and_doctors', 'visiting', 'visitRates')->get();

            return AdminDoctorResource::collection($doctors);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {

            $doctor = Doctor::with('users_and_doctors', 'visiting', 'visitRates')->findOrFail($id);

            return new AdminDoctorResource($doctor);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
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
