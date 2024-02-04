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
        Schema::create('visiting', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('user_doctor_id')->constrained('users_and_doctors')->onUpdate('cascade')->onDelete('cascade');
            $table->date('visit_date');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visiting');
    }
};
