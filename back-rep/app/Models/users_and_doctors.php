<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users_and_doctors extends Model
{
    use HasFactory;
    protected $table = 'users_and_doctors';
    protected $fillable = [
        'user_id',
        'doctor_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function client()
    {
        return $this->belongsTo(Doctor::class);
    }
}
