<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoCoursesRequest extends FormRequest
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
            "title" => "required|min:10|max:255|regex:/^[a-zA-Z0-9\s.:,'’-]+$/",
            "description" => [
                'required',
                'min:50',
                'max:100',
            ],
            "video_link" => "required|file|mimetypes:video/mp4",
            "course_id" => "required|exists:courses,id",
            "cover" => "required|image|mimes:jpg,jpeg,png",
            "order" => "required|numeric|min:1",
        ];
    }

    public function messages(): array
    {
        return [
            "title.regex" => "the course title is invalid",
            "title.min" => "the course title is too short",
            "title.max" => "the course title is too long",
            "description.min" => "the course description is too short",
            "description.max" => "the course description is too long",
            "video_link.required" => "the video link is required",
            "video_link.url" => "the video link is invalid",
            "course_id.required" => "the course is required",
            "course_id.exists" => "the course does not exist",
            "cover.required" => "the cover is required",
            "cover.image" => "the cover is invalid",
            "order.required" => "the order is required",
            "order.numeric" => "the order is invalid",
        ];
    }
}
