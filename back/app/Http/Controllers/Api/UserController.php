<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    function __construct()
    {
        $this->middleware('auth:sanctum')->except('store');
    }
    public function index()
    {
        try {
            $authenticatedUserId = Auth::id();
            $user = User::findOrFail($authenticatedUserId);
            return new UserResource($user);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
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
            $authenticatedUserId = Auth::id();
            $user = User::findOrFail($authenticatedUserId);
            return new UserResource($user);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(UpdateUserRequest $request, string $id)
    {
        try {
            $authenticatedUserId = Auth::id();
            if ($id != $authenticatedUserId) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $user = User::findOrFail($authenticatedUserId);
            $user->update($request->validated());
            return response()->json(['data' => new UserResource($user)], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
