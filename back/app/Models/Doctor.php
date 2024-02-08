<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_ar',
        'name_en',
        'class',
        'gov_id'
    ];

    public function visitRates()
    {
        return $this->hasMany(Visit_rate::class);
    }
    public function visiting()
    {
        return $this->hasMany(Visiting::class);
    }


}
