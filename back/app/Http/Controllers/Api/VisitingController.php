<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VisitingResource;
use App\Models\Visiting;
use App\Models\users_and_doctors;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Auth;

class VisitingController extends Controller
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
            $loggedInUserId = Auth::id();

            $visits = Visiting::where('user_id', $loggedInUserId)->get();


            return VisitingResource::collection($visits);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     try {
    //         $authenticatedUserId = Auth::id();
    //         $this->validate($request, [
    //             'doctor_id' => 'required',
    //             'visit_date' => 'required',
    //         ]);
    //         $visit = Visiting::create([
    //             "user_id" => $authenticatedUserId,
    //             "doctor_id" => $request->doctor_id,
    //             'visit_date' => $request->visit_date,
    //         ]);
    //         return response()->json(['data' => new VisitingResource($visit)], 200);
    //     } catch (Exception $e) {
    //         return response()->json($e, 500);
    //     }
    // }

    public function store(Request $request)
    {
        try {
            $authenticatedUserId = Auth::id();
            $isUserAllowedToVisit = users_and_doctors::where('user_id', $authenticatedUserId)
                ->where('doctor_id', $request->doctor_id)
                ->exists();

            if (!$isUserAllowedToVisit) {
                return response()->json(['message' => 'Unauthorized. You do not have a relationship with the specified doctor.'], 403);
            }
            $this->validate($request, [
                'doctor_id' => 'required',
                'visit_date' => 'required',
                'latitude' => 'required',
                'longitude' => 'required',
            ]);

            $visit = Visiting::create([
                "user_id" => $authenticatedUserId,
                "doctor_id" => $request->doctor_id,
                'visit_date' => $request->visit_date,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            return response()->json(['data' => new VisitingResource($visit)], 200);
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
            // $visit = Visiting::findOrFail($id);
            $loggedInUserId = Auth::id();

            $visit = Visiting::where('user_id', $loggedInUserId)->findOrFail($id);

            return new VisitingResource($visit);
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
