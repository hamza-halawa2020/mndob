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
            'created_at' => $this->created_at,
            'visit_date' => $this->visit_date,
            'latitude' => $this->visit_date,
            'longitude' => $this->visit_date,
            'doctor_id' => $this->doctor_id ? [
                'id' => Doctor::find($this->doctor_id)->id,
                'name_en' => Doctor::find($this->doctor_id)->name_en,
                'name_ar' => Doctor::find($this->doctor_id)->name_ar,
            ] : null,

        ];
    }
}
