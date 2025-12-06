<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Overtrue\LaravelVersionable\Version;
use Overtrue\LaravelVersionable\VersionStrategy;

class SiteVersion extends Version
{
    public static function createForModel(Model $model, array $replacements = [], $time = null): Version
    {
        $version = parent::createForModel($model, $replacements, $time);

        if (!$model instanceof Site) return $version;

        $contents = $model->pages->mapWithKeys(function ($page) {
            return [$page->id => [
                $page->content,
                $page->title,
                $page->url]
            ];
        })->toArray();
        $version->contents = array_merge($version->contents, ['pages' => $contents]);
        $version->save();
        return $version;
    }

    public function revertWithoutSaving(): ?Model
    {
        $original = $this->versionable->getRawOriginal();

        // apply the previous versions
        switch ($this->versionable->getVersionStrategy()) {
            case VersionStrategy::DIFF:
                // v1 + ... + vN
                $versionsBeforeThis = $this->previousVersions()->reorder()->orderOldestFirst()->get();
                foreach ($versionsBeforeThis as $version) {
                    if (!empty($version->contents)) {
                        $siteOnlyContents = $version->contents->except('pages')->toArray();
                        $this->versionable->setRawAttributes(array_merge($original, $siteOnlyContents));
                    }
                }
                break;
            case VersionStrategy::SNAPSHOT:
                // v1 + vN
                /** @var Version $initVersion */
                $initVersion = $this->versionable->versions()->first();
                if (!empty($initVersion->contents)) {
                    $siteOnlyContents = collect($initVersion->contents)->except('pages')->toArray();
                    $this->versionable->setRawAttributes(array_merge($original, $siteOnlyContents));
                }
        }

        // apply the latest version
        if (!empty($this->contents)) {
            // get the original attributes for insert(not been casted)
            $original = $this->versionable->getAttributesForInsert();
            $siteOnlyContents = $this->contents->except('pages')->toArray();
            $this->versionable->setRawAttributes(array_merge($original, $siteOnlyContents));
        }
        // Revert pages
        if (!empty($this->contents['pages'])) {
            foreach ($this->contents['pages'] as $pageId => $pageContents) {
                $page = $this->versionable->pages->find($pageId);
                if ($page) {
                    [$content, $title, $url] = $pageContents;
                    $page->content = $content;
                    $page->title = $title;
                    $page->url = $url;
                    $page->save();
                }
                if (!$page) {
                    // Page does not exist, create a new one
                    [$content, $title, $url] = $pageContents;
                    $this->versionable->pages->create([
                        'content' => $content,
                        'title' => $title,
                        'url' => $url,
                    ]);
                }
            }
        }

        return $this->versionable;
    }
}
