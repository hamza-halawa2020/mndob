<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VisiteRateResource;
use App\Models\Visit_rate;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Validator;

class VisitRateController extends Controller
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
            $visits = Visit_rate::alL();
            return VisiteRateResource::collection($visits);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Validator::extend('valid_visit_rate', function ($attribute, $value) {
            return $value >= 1 && $value <= 9;
        });

        Validator::extend('the_same_year', function ($attribute, $value) {
            return ($value) == date('Y');
        });
        try {
            $this->validate($request, [
                'visit_rate_min' => 'required|valid_visit_rate',
                'month' => 'required',
                'year' => 'required|the_same_year',
                'doctor_id' => 'required',
            ]);
            $visit = Visit_rate::create([
                'visit_rate_min' => $request->visit_rate_min,
                'month' => $request->month,
                'year' => $request->year,
                'doctor_id' => $request->doctor_id,
            ]);
            return response()->json(['data' => new VisiteRateResource($visit)], 200);
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
            $visit = Visit_rate::findOrFail($id);
            return new VisiteRateResource($visit);
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
