<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class calculateTotalDoctorsForUsersResource extends JsonResource
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
            'getData' => $this->getData,
            'id' => $this->id,
            'class' => $this->class,
            'created_at' => $this->created_at,
            'doctor_id' => $this->doctor_id,
            'doctor' => new AdminDoctorResource($this->doctor), // Assuming doctor is the relationship
            'gov_id' => $this->gov_id,
            'name_ar' => $this->name_ar,
            'name_en' => $this->name_en,
            'user_id' => $this->user_id,
        ];
    }
}


