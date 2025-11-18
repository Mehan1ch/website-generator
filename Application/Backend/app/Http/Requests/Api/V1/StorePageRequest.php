<?php

namespace App\Http\Requests\Api\V1;

use App\Models\Page;
use App\Models\Site;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePageRequest extends FormRequest
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
    public function rules(Site $site, ?Page $page): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'url' => [
                'required',
                'string',
                'max:255',
                Rule::unique('pages', 'url')
                    ->where('site_id', $site->id)
                    ->ignore($page), // For updates
            ],
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
        ];
    }
}
