<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class users_and_doctors extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'doctor_id',
    ];
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
    public function doctors()
    {
        return $this->belongsToMany(Doctor::class);
    }
}
