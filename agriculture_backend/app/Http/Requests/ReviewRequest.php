<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
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
            "review" => "required|string|min:1|max:350|regex:/^[A-Za-z0-9\s.,'’\-]+$/",
            "rating" => "required|integer|min:1|max:5",
        ];
    }

    public function messages(): array
    {
        return [
            "review.required" => "Review field is required.",
            "review.string" => "Review field must be string.",
            "review.min" => "Review field must be at least 1 character.",
            "review.max" => "Review field must be less than 350 characters.",
            "review.regex" => "Review is invalid",
            "rating.required" => "rating field is required.",
            "rating.integer" => "rating field must be integer.",
        ];
    }
}
