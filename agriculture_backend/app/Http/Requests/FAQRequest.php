<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FAQRequest extends FormRequest
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
            "title" => "required|min:10|max:500",
            "description" => "required|min:30|max:10000",
        ];
    }

    public function messages(): array
    {
        return [
            "title.regex" => "the title is invalid",
            "title.min" => "the title is too short",
            "title.max" => "the title is too long",
            "description.regex" => "the description is invalid",
            "description.min" => "the description is too short",
            "description.max" => "the description is too long",
        ];
    }
}
