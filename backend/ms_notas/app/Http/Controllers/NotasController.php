<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Illuminate\Http\Request;

class NotasController extends Controller
{
    public function index($codigo)
    {
        $notas = Nota::where('codigo_estudiante', $codigo)->get();
        return response()->json($notas);
    }

    public function store(Request $request, $codigo)
    {
        $nota = new Nota();
        $nota->codigo_estudiante = $codigo;
        $nota->actividad = $request->actividad;
        $nota->valor = $request->valor;
        $nota->save();
        return response()->json($nota, 201);
    }

    public function destroy($codigo, $actividad)
    {
        $nota = Nota::where('codigo_estudiante', $codigo)->where('actividad', $actividad)->first();
        $nota->delete();
        return response()->json(null, 204);
    }
}
