<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoctroResource;
use App\Http\Requests\StoreDoctorRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Exception;
use App\Models\User;
use App\Models\users_and_doctors;



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
            $doctors = Doctor::all();
            return DoctroResource::collection($doctors);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreDoctorRequest $request)
    {
        try {
            $authenticatedUserId = Auth::id();

            $validatedData = $request->validated();

            $doctor = Doctor::create([
                "name_ar" => $validatedData['name_ar'],
                'name_en' => $validatedData['name_en'],
                'class' => $validatedData['class'],
                'gov_id' => $validatedData['gov_id'],
                'user_id' => $authenticatedUserId,
            ]);

            users_and_doctors::create([
                'user_id' => $authenticatedUserId,
                'doctor_id' => $doctor->id,
            ]);

            return response()->json(['data' => new DoctroResource($doctor)], 200);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            return new DoctroResource($doctor);
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
        //
    }
}
