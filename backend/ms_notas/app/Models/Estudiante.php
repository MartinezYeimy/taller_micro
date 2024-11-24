<?php

 namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

    protected $fillable = ['codigo', 'nombre', 'email', 'promedio', 'estado'];

    public function notas()
    {
        return $this->hasMany(Nota::class, 'codigo_estudiante');
    }
}
 ?>
