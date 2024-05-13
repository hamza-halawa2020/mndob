<?php

namespace App\Http\Resources;

use App\Models\Governate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminUserResource extends JsonResource
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
            'role' => $this->role,
            'created_at' => $this->created_at,
            'gov_id' => $this->gov_id ? [
                'id' => Governate::find($this->gov_id)->id,
                'name_en' => Governate::find($this->gov_id)->name_en,
                'name_ar' => Governate::find($this->gov_id)->name_ar,
            ] : null,


        ];
    }
}
