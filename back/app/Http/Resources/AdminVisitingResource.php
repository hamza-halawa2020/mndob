<?php

namespace App\Http\Resources;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminVisitingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'created_at' => $this->created_at->format('Y-m-d'), 
            'visit_date' => $this->visit_date,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'doctor_id' => $this->doctor_id ? [
                'id' => Doctor::find($this->doctor_id)->id,
                'name_en' => Doctor::find($this->doctor_id)->name_en,
                'name_ar' => Doctor::find($this->doctor_id)->name_ar,
            ] : null,

        ];
    }
}
