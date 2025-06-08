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

        User::create([
            'login' => $login,
            'password' => bcrypt($password),
            'role' => 'user',
        ]);

        return Response::json([
            'message' => 'Пользователь зарегистрирован',
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
            'message' => 'Вы вошли',
        ], 200);
    }
}
