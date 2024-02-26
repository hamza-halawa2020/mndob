<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
        ];
        if ($this->filled('email')) {
            $rules['email'] = 'required';
        }

        if ($this->filled('password')) {
            $rules['password'] = 'required';
        }

        if ($this->filled('name_ar')) {
            $rules['name_ar'] = 'required';
        }

        if ($this->filled('name_en')) {
            $rules['name_en'] = 'required';
        }
        if ($this->filled('gov_id')) {
            $rules['gov_id'] = 'required';
        }
        return $rules;
    }
}
