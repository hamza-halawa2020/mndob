<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use Exception;

class UserController extends Controller
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
            $users = User::where('role', 'representative')->get();
            return response()->json(['users' => $users], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function profile()
    {
        try {
            $authenticatedUserId = Auth::id();
            $user = User::findOrFail($authenticatedUserId);
            return new UserResource($user);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    
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

    public function show(string $id)
    {
        try {
            $user = User::where('role', 'representative')->findOrFail($id);
            return new UserResource($user);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function destroy(string $id)
    {
        try {
            $doctor = User::findOrFail($id);
            $doctor->delete();

            return response()->json(['message' => 'deleted'], 200);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
}
