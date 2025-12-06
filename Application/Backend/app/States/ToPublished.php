<?php

namespace App\States;

use App\Models\Schema;
use App\Models\Site;
use Spatie\ModelStates\Transition;

class ToPublished extends Transition
{
    private Site|Schema $model;

    public function __construct(Site|Schema $model)
    {
        $this->model = $model;
    }

    public function handle(): Site|Schema
    {
        $this->model->published_at = now();
        $this->model->state = new Published($this->model);
        $this->model->save();
        return $this->model;
    }
}
