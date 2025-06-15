<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CoursesRequest extends FormRequest
{

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
                'max:10000',
            ],
            "keys_learning" => [
                'required',
                'min:50',
                'max:10000',
            ],
            "modules_and_topics" => [
                'required',
                'min:50',
                'max:10000',
            ],
            "total_hours" => "required",
            "type_video" => "required|in:video,playlist",
            "type_payment" => "required|in:free,paid",
            "category_id" => "required|exists:categories_courses,id",
            "langues" => "required|array",
            "price" => "nullable|numeric|min:0",
            "cover" => "required|image|mimes:jpg,jpeg,png",
            'trailer' => 'required|file|mimetypes:video/mp4'
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
            "keys_learning.regex" => "the keys learning is invalid",
            "modules_and_topics.regex" => "the modules and topics is invalid",
            "keys_learning.min" => "the keys learning is too short",
            "keys_learning.max" => "the keys learning is too long",
            "modules_and_topics.min" => "the modules and topics is too short",
            "modules_and_topics.max" => "the modules and topics is too long",
            "total_hours.required" => "the total hours is required",
            "type_video.required" => "the type of video is required",
            "type_video.enum" => "the type of video is invalid",
            "type_payment.required" => "the type of payment is required",
            "type_payment.enum" => "the type of payment is invalid",
            "category_id.required" => "the category is required",
            "langues.required" => "the langues is required",
            "langues.array" => "the langues is invalid",
            "price.numeric" => "the price is invalid",
            "category_id.exists" => "the category does not exist",
            "cover.required" => "the cover is required",
            "cover.image" => "the cover is invalid",
            "trailer.video" => "the trailer is invalid",
        ];

    }
}
