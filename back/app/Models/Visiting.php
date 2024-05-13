<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visiting extends Model
{
    use HasFactory;
    protected $fillable = [
        'visit_date',
        'user_id',
        'doctor_id',
        'latitude',
        'longitude'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
