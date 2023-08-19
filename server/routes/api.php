<?php

use App\Http\Controllers\StarWarsAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/get-people', [StarWarsAPIController::class, 'getPeople']);
Route::get('/get-starships', [StarWarsAPIController::class, 'getStarships']);
Route::get('/get-planets', [StarWarsAPIController::class, 'getPlanets']);