<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SchemaRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
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
            'name' => [
                'description' => 'The name of the schema.',
                'example' => 'Portfolio Schema'
            ],
            'description' => [
                'description' => 'A brief description of the schema.',
                'example' => 'A webpage schema for a personal portfolio site.'
            ],
            'content' => [
                'description' => 'The content of the schema, base64 encoded and lz compressed JSON',
                'example' => 'eJzT0yMAAGTvBe8=',
            ],
        ];
    }
}
