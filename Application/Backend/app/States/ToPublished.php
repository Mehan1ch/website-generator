<?php

namespace App\States;

use App\Models\Site;
use Illuminate\Support\Facades\Log;
use Spatie\ModelStates\Transition;

class ToPublished extends Transition
{
    private Site $site;

    public function __construct(Site $site)
    {
        $this->site = $site;
    }

    public function handle(): Site
    {
        $this->site->published_at = now();
        $this->site->state = new Published($this->site);
        $this->site->save();
        return $this->site;
    }
}
