<?php

namespace App\Http\Controllers\Api;

use Exception;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        try {
            $this->validate($request, [
                'email' => 'required',
                'password' => 'required',
            ]);
            $credentials = $request->only('email', 'password');
            if (!JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid login'], 401);
            }
            $user = Auth::user();
            $user->tokens()->delete();
            $token = $user->createToken($user->email)->plainTextToken;
            return response()->json([
                'access_token' => $token,
                'role' => $user->role,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 10,
            ], 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }



}