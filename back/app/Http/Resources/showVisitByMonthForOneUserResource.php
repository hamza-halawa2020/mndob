<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class showVisitByMonthForOneUserResource extends JsonResource
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
            'doctors' => AdminDoctorResource::collection($this['doctors']),
            'visits' => AdminVisitingResource::collection($this['visits']),
        ];
    }
}
