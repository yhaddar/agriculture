<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OurAppsRequest extends FormRequest
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
            "description" => "required|min:10|max:10000",
            "image" => "required|image|mimes:jpg,jpeg,png",
            "link" => "required|url",
            "services" => "required",
        ];
    }

    public function messages(): array
    {
        return [
            "description.min" => "the description is too short",
            "description.max" => "the description is too long",
            "image.required" => "the image is required",
            "image.image" => "the image is invalid",
            "services.required" => "the services is required",
        ];
    }
}
