<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Hash;
use App\User;

class AuthController extends Controller
{
    // Ригистрация
    public function register(Request $request)
    {

        $login = $request->input('login');
        $password = $request->input('password');

        if (User::where('login', $login)->exists()) {
            return Response::json([
                'message' => 'Пользователь с таким логином уже существует'
            ], 422);
        }

        $user = User::create([
            'login' => $login,
            'password' => $password,
            'role' => 'user',
        ]);

        return Response::json([
            'uid' => $user->id,
        ], 201);
    }

    // Вход
    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('login', $request->login)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return Response::json([
                'message' => 'Неверные учётные данные'
            ], 401);
        }

        return Response::json([
            'uid' => $user->id,
        ], 200);
    }

    public function getUserInfo(Request $request)
    {
        $id = $request->input('id');
        $user = User::find($id)->makeHidden(['id', 'password']);

        return Response::json([
            'user' => $user,
        ], 200);
    }


}
