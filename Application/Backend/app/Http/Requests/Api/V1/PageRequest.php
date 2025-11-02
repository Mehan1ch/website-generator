<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:255', 'unique:pages,url'],
            'content' => ['nullable', 'string'],
        ];
    }

    /**
     * Define the body parameters for API documentation.
     *
     * @return array
     */
    public function bodyParameters(): array
    {
        return [
            'content' => [
                'description' => 'The content of the schema, base64 encoded and lz compressed JSON',
                'example' => 'eJzT0yMAAGTvBe8=',
            ],
            'title' => [
                'description' => 'The title of the page.',
                'example' => 'My personal homepage'
            ],
            'url' => [
                'description' => 'The URL slug for the post.',
                'example' => 'my-first-post',
            ],
        ];
    }
}
