<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoctroResource;
use App\Http\Requests\StoreDoctorRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Doctor;
use App\Models\Governate;
use App\Models\Visit_rate;
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

    // public function index(Request $request)
    // {
    //     try {
    //         $authenticatedUserId = Auth::id();
    //         $isUser = User::where('id', $authenticatedUserId)->exists();
    //         $isDoctor = Doctor::where('id', $authenticatedUserId)->exists();
    //         if ($isUser) {
    //             $doctors = users_and_doctors::where('user_id', $authenticatedUserId)
    //                 ->with('user', 'doctor')
    //                 ->get();
    //             foreach ($doctors as $doctor) {
    //                 $governorateName = Governate::where('id', $doctor->doctor->gov_id)->value('name_en');
    //                 // $governorateName_ar = Governate::where('id', $doctor->doctor->gov_id)->value('name_ar');
    //                 $doctor->doctor->gov_name_en = $governorateName;
    //                 // $doctor->doctor->gov_name_ar = $governorateName_ar;
    //             }
    //             return DoctroResource::collection($doctors);
    //         } else if ($isDoctor) {
    //             $doctors = users_and_doctors::where('doctor_id', $authenticatedUserId)
    //                 ->with('user', 'doctor')
    //                 ->get();
    //             return response()->json(['message' => 'Unauthorized.'], 403);
    //         } else {
    //             return response()->json(['message' => 'Unauthorized.'], 403);
    //         }
    //     } catch (Exception $e) {
    //         return response()->json($e, 500);
    //     }
    // }


    public function index(Request $request)
    {
        try {
            $authenticatedUserId = Auth::id();
            $isUser = User::where('id', $authenticatedUserId)->exists();
            $isDoctor = Doctor::where('id', $authenticatedUserId)->exists();

            if ($isUser) {
                $doctors = users_and_doctors::where('user_id', $authenticatedUserId)
                    ->with('user', 'doctor', 'doctor.visitRates') // Include visit rates relationship
                    ->get();

                foreach ($doctors as $doctor) {
                    $governorateName = Governate::where('id', $doctor->doctor->gov_id)->value('name_en');
                    $doctor->doctor->gov_name_en = $governorateName;
                }

                return DoctroResource::collection($doctors);
            } else if ($isDoctor) {
                $doctors = users_and_doctors::where('doctor_id', $authenticatedUserId)
                    ->with('user', 'doctor', 'doctor.visitRates') // Include visit rates relationship
                    ->get();

                return response()->json(['message' => 'Unauthorized.'], 403);
            } else {
                return response()->json(['message' => 'Unauthorized.'], 403);
            }
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
            $authenticatedUserId = Auth::id();
            if ($authenticatedUserId) {
                $doctor = users_and_doctors::where('doctor_id', $id)
                    ->where('user_id', $authenticatedUserId)
                    ->with('user', 'doctor', 'doctor.visitRates')
                    ->first();
                if ($doctor) {
                    $governorateName = Governate::where('id', $doctor->doctor->gov_id)->value('name_en');
                    $doctor->doctor->gov_name_en = $governorateName;
                    return new DoctroResource($doctor);
                } else {
                    return response()->json(['message' => 'Doctor not found.'], 404);
                }
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'An unexpected error occurred.'], 500);
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
