<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visit_rates', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('visit_rate_min');
            $table->enum('month',['1','2','3','4','5','6','7','8','9','10','11','12']);
            $table->year('year');
            $table->foreignId('doctor_id')->constrained('doctors')->onUpdate('cascade')->onDelete('cascade');
            $table->unique(['doctor_id', 'month', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visit_rates');
    }
};
