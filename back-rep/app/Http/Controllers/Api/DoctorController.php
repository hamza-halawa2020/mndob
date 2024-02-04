<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DoctroResource;
use App\Http\Requests\StoreDoctorRequest;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Exception;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
            $this->validate($request, [
                'name_ar' => 'required|string',
                'name_en' => 'required|string',
                'class' => 'required',
                'gov_id' => 'required',
            ]);
            $doctor = Doctor::create([
                "name_ar" => $request->name_ar,
                'name_en' => $request->name_en,
                'class' => $request->class,
                'gov_id' => $request->gov_id,
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
