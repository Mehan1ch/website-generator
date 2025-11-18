<?php

namespace App\Services;

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

    public function __construct(private ?HtmlSanitizerConfig $config = null)
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
    }

    /**
     * Sanitize the given HTML content.
     *
     * @param string $html The HTML content to sanitize.
     * @return string The sanitized HTML content.
     */
    public function sanitize(string $html): string
    {
        return $this->sanitizer->sanitize($html);
    }

}
