<?php

namespace App\Http\Resources;

use App\Models\Governate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminDoctorResource extends JsonResource
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
            'name_en' => $this->name_en,
            'name_ar' => $this->name_ar,
            'class' => $this->class,
            'gov_id' => $this->gov_id ? [
                'id' => Governate::find($this->gov_id)->id,
                'name_en' => Governate::find($this->gov_id)->name_en,
                'name_ar' => Governate::find($this->gov_id)->name_ar,
            ] : null,
            'user_id' => $this->users_and_doctors->map(function ($usersAndDoctors) {
                return [
                    'id' => $usersAndDoctors->user->id,
                    'name_en' => $usersAndDoctors->user->name_en,
                    'name_ar' => $usersAndDoctors->user->name_ar,
                ];
            }),

            'visiting' => $this->visiting->map(function ($visiting) {
                return [
                    'id' => $visiting->id,
                    'visit_date' => $visiting->visit_date,
                    'latitude' => $visiting->latitude,
                    'longitude' => $visiting->longitude,
                ];
            }),

            'visit_rates' => $this->visitRates->map(function ($visit_rates) {
                return [
                    'id' => $visit_rates->id,
                    'visit_rate_min' => $visit_rates->visit_rate_min,
                    'month' => $visit_rates->month,
                    'year' => $visit_rates->year,
                ];
            }),
        ];
    }
}
