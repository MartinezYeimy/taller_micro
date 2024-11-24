<?php
namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;

class EstudiantesController extends Controller
{
    public function index()
    {
        $estudiantes = Estudiante::all();
        return response()->json($estudiantes);
    }

    public function store(Request $request)
    {
        $estudiante = Estudiante::create($request->all());
        return response()->json($estudiante, 201);
    }

    public function show($codigo)
    {
        $estudiante = Estudiante::where('codigo', $codigo)->firstOrFail();
        return response()->json($estudiante);
    }

    public function update(Request $request, $codigo)
    {
        $estudiante = Estudiante::where('codigo', $codigo)->firstOrFail();
        $estudiante->update($request->all());
        return response()->json($estudiante);
    }

    public function destroy($codigo)
    {
        Estudiante::where('codigo', $codigo)->delete();
        return response()->json(null, 204);
    }
}
