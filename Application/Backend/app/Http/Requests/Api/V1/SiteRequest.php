<?php

namespace App\Http\Requests\Api\V1;

use App\Models\Site;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SiteRequest extends FormRequest
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
        $states = Site::getStatesFor('state')->toArray();
        return [
            'name' => ['required', 'string', 'max:255'],
            'subdomain' => ['required', 'string', 'max:255', 'unique:sites,subdomain'],
            'description' => ['nullable', 'string'],
            'state' => ['required', 'string', 'in:' . implode(',', $states)],
        ];
    }

    /**
     * Define the body parameters for API documentation.
     *
     * @return array
     */
    public function bodyParameters(): array
    {
        $states = Site::getStatesFor('state')->toArray();
        $defaultState = Site::getDefaultStateFor('state');
        return [
            'name' => [
                'description' => 'The name of the site.',
                'example' => 'My Personal Site'
            ],
            'subdomain' => [
                'description' => 'The subdomain for the site.',
                'example' => 'mypersonalsite'
            ],
            'description' => [
                'description' => 'A brief description of the site.',
                'example' => 'This is my personal website where I share my projects and blog posts.'
            ],
            'state' => [
                'description' => 'The state of the site. Allowed values: ' . implode(',', $states),
                'example' => $defaultState,
            ],
        ];
    }
}
