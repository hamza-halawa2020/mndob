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
            'id' => $this->id,
            'created_at' => $this->created_at,
            // 'doctor_id' => $this->doctor_id,
            'visit_date' => $this->visit_date,
            'latitude' => $this->visit_date,
            'longitude' => $this->visit_date,

            'doctor_id' => $this->users_and_doctors->map(function ($usersAndDoctors) {
                return [
                    'id' => $usersAndDoctors->id,
                    'name_en' => $usersAndDoctors->name_en,
                    'name_ar' => $usersAndDoctors->name_ar,
                ];
            }),
        ];
    }
}
