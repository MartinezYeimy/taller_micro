<?php

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\EstudiantesController;
use App\Http\Controllers\NotasController;

Route::resource('estudiantes', EstudiantesController::class); 
Route::get('notas/{codigo}', [NotasController::class, 'index']); 
Route::post('notas/{codigo}', [NotasController::class, 'store']); 
Route::delete('notas/{codigo}/{actividad}', [NotasController::class, 'destroy']); 