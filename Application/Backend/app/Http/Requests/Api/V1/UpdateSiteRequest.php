<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
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
                'description' => 'The name of the site.',
                'example' => 'My Personal Site'
            ],
            'description' => [
                'description' => 'A brief description of the site.',
                'example' => 'This is my personal website where I share my projects and blog posts.'
            ],
        ];
    }
}
