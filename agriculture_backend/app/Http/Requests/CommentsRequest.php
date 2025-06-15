<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentsRequest extends FormRequest
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
            "courses_id" => "nullable|exists:courses,id",
            "innovation_id" => "nullable|exists:innovations,id",
            "comment" => "required|string|min:0|max:200|regex:/^[a-zA-Z0-9\s.:,'’-]+$/",
            "rate" => "integer|nullable|min:1|max:5",
        ];
    }

    public function messages(): array
    {
        return [
            "course_id.exists" => "the course does not exist",
            "innovation_id.exists" => "the innovation does not exist",
            "comment.required" => "the comment is required",
            "comment.min" => "the comment is too short",
            "comment.max" => "the comment is too long",
            "rate.number" => "the rate must be a number",
        ];
    }
}
