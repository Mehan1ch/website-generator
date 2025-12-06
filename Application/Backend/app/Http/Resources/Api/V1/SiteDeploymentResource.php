<?php

namespace App\Http\Resources\Api\V1;

use App\Models\Page;
use App\Models\Site;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Site
 */
class SiteDeploymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->subdomain,
            'subDomain' => $this->subdomain,
            'pages' => $this->pages->map(function (Page $page) {
                return [
                    'path' => $page->url,
                    'htmlUrl' => $page->staticHTML,
                ];
            })->toArray(),
            'domain' => config('app.kube_domain'),
            'namespace' => config('app.kube_namespace'),
        ];
    }
}
