<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LikeRequest extends FormRequest
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
            "service_id" => "nullable|exists:services,id",
            "courses_id" => "nullable|exists:courses,id",
        ];
    }

    public function messages(): array
    {
        return [
          "service_id.exists" => "this service is not exist",
          "courses_id.exists" => "this courses is not exist"
        ];
    }
}
