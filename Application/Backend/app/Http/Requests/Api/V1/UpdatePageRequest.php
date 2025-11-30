<?php

namespace App\Http\Requests\Api\V1;

use App\Models\Page;
use App\Models\Site;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageRequest extends FormRequest
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
        $site_id = $this->route()->parameter("site")?->id;
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'url' => [
                'nullable',
                'string',
                'max:255',
                'starts_with:/',
                Rule::unique('pages', 'url')
                    ->where('site_id', $site_id)
                    ->ignore($this->route()->parameter("page")), // Ignore the current page ID
            ],
            'content' => ['sometimes', 'nullable', 'string'],
            'html' => ['sometimes', 'nullable', 'string'],
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
            'title' => [
                'description' => 'The title of the page . ',
                'example' => 'My personal homepage'
            ],
            'url' => [
                'description' => 'The URL slug for the post . ',
                'example' => 'my - first - post',
            ],
            'content' => [
                'description' => 'The content of the schema, base64 encoded and zlib compressed JSON',
                'example' => 'eJzT0yMAAGTvBe8 = ',
            ],
            'html' => [
                'description' => 'The HTML content of the page base64 encoded and zlib compressed',
                'example' => 'eJzT0yMAAGTvBe8 = ',
            ]
        ];
    }
}
