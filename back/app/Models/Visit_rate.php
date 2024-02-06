<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit_rate extends Model
{
    use HasFactory;
    protected $fillable = [
        'visit_rate_min',
        'month',
        'year',
        'doctor_id'
    ];
}
