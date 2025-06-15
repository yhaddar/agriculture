<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class InnovationRequest extends FormRequest
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
        return [
            "innovation" => "required|min:8|max:255|regex:/^[A-Za-z0-9\.\-_\'\s]*$/",
            "inventor" => "required|min:3|max:30|regex:/^[A-Za-z\-_\'\s]*$/",
            "date_creation" => "required|date",
            "description" => [
                'required',
                'min:50',
                'max:10000',
                'regex:/^[\p{L}0-9.,;:()\'"?!%&\-\–—\s]{20,}$/u'
            ],
            "impact" => 'regex:/^[\p{L}0-9.,;:()\'"?!%&\-\–—\s]{20,}$/u',
            "image" => "required|image|mimes:jpg,jpeg"
        ];
    }

    public function messages(): array
    {
        return [
            "innovation.regex" => "the innovation title is invalid",
            "innovation.min" => "the innovation title is too short",
            "innovation.max" => "the innovation title is too long",
            "inventor.min" => "the inventor title is too short",
            "inventor.max" => "the inventor title is too long",
            "inventor.regex" => "the inventor is invalid",
            "description.min" => "the innovation description is too short",
            "description.max" => "the innovation description is too long",
            "impact.regex" => "the impact of innovation is invalid",
        ];
    }
}
