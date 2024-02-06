<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Gate;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::all();
            return UserResource::collection($users);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            $this->validate($request, [
                'name_ar' => 'required|string',
                'name_en' => 'required|string',
                'gov_id' => 'required',
                'role' => '',
                'email' => 'required',
                'password' => 'required',
            ]);
            $user = User::create([
                'name_ar' => $request->name_ar,
                'name_en' => $request->name_en,
                'gov_id' => $request->gov_id,
                // 'role' => $request->role,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            return response()->json(['data' => new UserResource($user)], 200);
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
            $user = User::findOrFail($id);
            return new UserResource($user);
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
