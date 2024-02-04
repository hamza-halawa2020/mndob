<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GovernateResource;
use App\Models\Governate;
use Illuminate\Http\Request;
use Exception;

class GovernateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $governates = Governate::all();
            return GovernateResource::collection($governates);
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
            $governate = Governate::findOrFail($id);
            return new GovernateResource($governate);
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
