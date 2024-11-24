<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{

    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->id();
            $table->string('codigo')->unique();
            $table->string('nombre');
            $table->string('email');
            $table->float('promedio')->nullable();
            $table->enum('estado', ['Aprobado', 'Reprobado', 'Sin nota']);
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('estudiantes');
    }
}
