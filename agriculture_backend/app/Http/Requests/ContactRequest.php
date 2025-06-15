<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            "email" => "required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/",
            "subject" => "required|min:8|max:150|regex:/^(?!\s*$).{8,150}$/",
            "message" => "required|min:10|max:5000|regex:/^(?!\s*$)[\s\S]{10,5000}$/",
        ];
    }

    public function messages(): array
    {
        return [
            "email.regex" => "the email is invalid",
            "subject.regex" => "the subject is invalid",
            "message.regex" => "the message is invalid",
            "subject.min" => "the subject is too short",
            "subject.max" => "the subject is too long",
            "message.min" => "the message is too short",
            "message.max" => "the message is too long",
            "email.required" => "the email is required",
            "subject.required" => "the subject is required",
            "message.required" => "the message is required",
        ];
    }
}
