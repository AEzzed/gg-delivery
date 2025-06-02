<?php

use App\Http\Controllers\ProductController;
use App\Product;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/catalog', [ProductController::class, 'getCatalog'])->name('getCatalog');

//Get all product categories
Route::get('/categories', [ProductController::class, 'getCategories'])->name('getCategories');