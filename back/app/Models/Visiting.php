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
}
