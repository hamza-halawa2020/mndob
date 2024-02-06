<?php

namespace App\Http\Controllers\Api;

use Exception;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function login(Request $request)
    {

        try {
            $this->validate($request, [
                'email' => 'required',
                "password" => 'required',
            ]);
            $login = $request->only("email", "password");
            if (!Auth::attempt($login)) {
                return response(['message' => 'invalid login'], 401);
            }
            $user = Auth::user();
            $user->tokens()->delete();
            $token = $user->createToken($user->email);
            return response([
                'role' => $user->role,
                'token' => $token->plainTextToken
            ], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
}