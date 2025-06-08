<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/catalog', [ProductController::class, 'getCatalog']);

Route::get('/categories', [ProductController::class, 'getCategories']);
Route::get('/product', [ProductController::class, 'getProduct']);

Route::post('/cart/item/add', [ProductController::class, 'addItemToCart']);
Route::post('/cart/item/remove', [ProductController::class, 'removeItemFromCart']);
Route::post('/cart/remove', [ProductController::class, 'removeFromCart']);
Route::post('/cart/item/quantity', [ProductController::class, 'getCartItemQuantity']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Route::get('/user', [AuthController::class, 'user']);