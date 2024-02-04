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
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
