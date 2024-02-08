<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VisitingResource;
use App\Models\Visiting;
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
            $visits = Visiting::all();
            return VisitingResource::collection($visits);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $authenticatedUserId = Auth::id();
            $this->validate($request, [
                'doctor_id' => 'required',
                'visit_date' => 'required',
            ]);
            $visit = Visiting::create([
                "user_id" => $authenticatedUserId,
                "doctor_id" => $request->doctor_id,
                'visit_date' => $request->visit_date,
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
            $visit = Visiting::findOrFail($id);
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