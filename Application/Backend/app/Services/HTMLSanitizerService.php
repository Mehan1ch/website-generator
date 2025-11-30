<?php

namespace App\Services;

use Illuminate\Contracts\View\Factory as ViewFactory;
use Symfony\Component\HtmlSanitizer\HtmlSanitizer;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;

/**
 * HTML Sanitizer Service
 *
 * This service provides functionality to sanitize HTML content using the Symfony HTML Sanitizer component.
 */
class HTMLSanitizerService
{
    private HtmlSanitizer $sanitizer;

    public function __construct(private ?HtmlSanitizerConfig $config = null, private ?ViewFactory $viewFactory = null)
    {
        if ($this->config === null) {
            $this->config = (new HtmlSanitizerConfig())
                ->allowSafeElements()
                ->allowStaticElements()
                ->allowRelativeLinks()
                ->allowMediaSchemes(['https', 'http'])
                ->allowRelativeMedias();
        }
        $this->sanitizer = new HtmlSanitizer($this->config);

        if ($this->viewFactory === null) {
            $this->viewFactory = app(ViewFactory::class);
        }
    }

    /**
     * Sanitize the given HTML content.
     *
     * @param string $html The HTML content to sanitize.
     * @return string The sanitized HTML content.
     */
    public function sanitize(string $html, string $title): string
    {
        $sanitizedBody = $this->sanitizer->sanitize($html);

        // Remove any leading whitespace before and after the first HTML tag (preserves internal formatting)
        $sanitizedBody = preg_replace('/^\s*(?=<)/u', '', $sanitizedBody) ?? $sanitizedBody;
        $sanitizedBody = preg_replace('/(?<=>)\s*$/u', '', $sanitizedBody) ?? $sanitizedBody;

        return $this->viewFactory->make('sanitized.full', [
            'title' => $title,
            'body' => $sanitizedBody,
        ])->render();
    }
}
