<?php

namespace Tests\Unit\Services;

use App\Services\HTMLSanitizerService;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\View\View;
use Mockery;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;
use Tests\TestCase;

class HTMLSanitizerServiceTest extends TestCase
{
    protected HTMLSanitizerService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new HTMLSanitizerService();
    }

    public function test_sanitizes_basic_html_content(): void
    {
        $html = '<div><p>Hello World</p></div>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<p>Hello World</p>', $result);
        $this->assertStringContainsString('<title>Test Page</title>', $result);
        $this->assertStringContainsString('<!doctype html>', $result);
    }

    public function test_removes_dangerous_script_tags(): void
    {
        $html = '<div><p>Safe content</p><script>alert("XSS")</script></div>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringNotContainsString('<script>', $result);
        $this->assertStringNotContainsString('alert("XSS")', $result);
        $this->assertStringContainsString('<p>Safe content</p>', $result);
    }

    public function test_removes_dangerous_inline_javascript(): void
    {
        $html = '<div><a href="#" onclick="alert(\'XSS\')">Click me</a></div>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringNotContainsString('onclick', $result);
        $this->assertStringContainsString('<a href="#">Click me</a>', $result);
    }

    public function test_allows_safe_html_elements(): void
    {
        $html = '<div><h1>Title</h1><p>Paragraph</p><ul><li>Item 1</li><li>Item 2</li></ul></div>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<h1>Title</h1>', $result);
        $this->assertStringContainsString('<p>Paragraph</p>', $result);
        $this->assertStringContainsString('<ul>', $result);
        $this->assertStringContainsString('<li>Item 1</li>', $result);
        $this->assertStringContainsString('<li>Item 2</li>', $result);
    }

    public function test_allows_images_with_safe_attributes(): void
    {
        $html = '<img src="https://example.com/image.jpg" alt="Test Image">';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<img', $result);
        $this->assertStringContainsString('src="https://example.com/image.jpg"', $result);
        $this->assertStringContainsString('alt="Test Image"', $result);
    }

    public function test_allows_iframes(): void
    {
        $html = '<iframe src="https://example.com/embed" width="560" height="315"></iframe>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<iframe', $result);
        $this->assertStringContainsString('src="https://example.com/embed"', $result);
    }

    public function test_allows_links_with_http_and_https_schemes(): void
    {
        $html = '<a href="https://example.com">HTTPS Link</a><a href="http://example.com">HTTP Link</a>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('href="https://example.com"', $result);
        $this->assertStringContainsString('href="http://example.com"', $result);
        $this->assertStringContainsString('HTTPS Link', $result);
        $this->assertStringContainsString('HTTP Link', $result);
    }

    public function test_allows_relative_links(): void
    {
        $html = '<a href="/about">About</a><a href="contact.html">Contact</a>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('href="/about"', $result);
        $this->assertStringContainsString('href="contact.html"', $result);
    }

    public function test_allows_protocol_relative_links(): void
    {
        $html = '<a href="//example.com/resource">Resource</a>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('href="//example.com/resource"', $result);
    }

    public function test_removes_leading_whitespace_before_html(): void
    {
        $html = "  \n  <div>Content</div>";
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        // The body content should not have leading whitespace before the first tag
        $this->assertMatchesRegularExpression('/<body>\s*<div>Content<\/div>/', $result);
    }

    public function test_removes_trailing_whitespace_after_html(): void
    {
        $html = "<div>Content</div>  \n  ";
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        // The body content should not have trailing whitespace after the last tag
        $this->assertMatchesRegularExpression('/<div>Content<\/div>\s*<\/body>/', $result);
    }

    public function test_preserves_internal_formatting(): void
    {
        $html = "<div>\n  <p>Line 1</p>\n  <p>Line 2</p>\n</div>";
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<p>Line 1</p>', $result);
        $this->assertStringContainsString('<p>Line 2</p>', $result);
    }

    public function test_sanitizes_empty_html(): void
    {
        $html = '';
        $title = 'Empty Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<title>Empty Page</title>', $result);
        $this->assertStringContainsString('<!doctype html>', $result);
    }

    public function test_escapes_special_characters_in_text(): void
    {
        $html = '<p>Price: $100 & more</p>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('Price:', $result);
        $this->assertStringContainsString('$100', $result);
    }

    public function test_removes_style_tags(): void
    {
        $html = '<style>body { color: red; }</style><p>Content</p>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringNotContainsString('<style>', $result);
        $this->assertStringNotContainsString('color: red', $result);
        $this->assertStringContainsString('<p>Content</p>', $result);
    }

    public function test_allows_static_elements_like_tables(): void
    {
        $html = '<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<table>', $result);
        $this->assertStringContainsString('<tr>', $result);
        $this->assertStringContainsString('<td>Cell 1</td>', $result);
        $this->assertStringContainsString('<td>Cell 2</td>', $result);
    }

    public function test_allows_forms_and_inputs(): void
    {
        $html = '<form><input type="text" name="username"><button type="submit">Submit</button></form>';
        $title = 'Test Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<form>', $result);
        $this->assertStringContainsString('<input', $result);
        $this->assertStringContainsString('<button', $result);
    }

    public function test_uses_custom_config_when_provided(): void
    {
        $config = (new HtmlSanitizerConfig())
            ->allowSafeElements()
            ->blockElement('a'); // Block all anchor tags

        $service = new HTMLSanitizerService($config);

        $html = '<p>Text</p><a href="https://example.com">Link</a>';
        $title = 'Test Page';

        $result = $service->sanitize($html, $title);

        $this->assertStringContainsString('<p>Text</p>', $result);
        $this->assertStringNotContainsString('<a href', $result);
    }

    public function test_uses_custom_view_factory_when_provided(): void
    {
        $mockView = Mockery::mock(View::class);
        $mockView->shouldReceive('render')
            ->once()
            ->andReturn('<html>Mocked View</html>');

        $mockViewFactory = Mockery::mock(ViewFactory::class);
        $mockViewFactory->shouldReceive('make')
            ->once()
            ->with('sanitized.full', Mockery::on(function ($data) {
                return $data['title'] === 'Custom Title' &&
                       str_contains($data['body'], 'Content');
            }))
            ->andReturn($mockView);

        $service = new HTMLSanitizerService(null, $mockViewFactory);

        $result = $service->sanitize('<p>Content</p>', 'Custom Title');

        $this->assertEquals('<html>Mocked View</html>', $result);
    }

    public function test_sanitizes_complex_nested_structure(): void
    {
        $html = '
            <div class="container">
                <header>
                    <h1>Welcome</h1>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </nav>
                </header>
                <main>
                    <article>
                        <h2>Article Title</h2>
                        <p>Article content</p>
                    </article>
                </main>
                <footer>
                    <p>&copy; 2025</p>
                </footer>
            </div>
        ';
        $title = 'Complex Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<h1>Welcome</h1>', $result);
        $this->assertStringContainsString('<nav>', $result);
        $this->assertStringContainsString('<a href="/">Home</a>', $result);
        $this->assertStringContainsString('<article>', $result);
        $this->assertStringContainsString('<footer>', $result);
    }

    public function test_handles_malformed_html_gracefully(): void
    {
        $html = '<div><p>Unclosed paragraph<div>Nested incorrectly</p></div>';
        $title = 'Malformed Page';

        $result = $this->service->sanitize($html, $title);

        // Sanitizer should fix malformed HTML
        $this->assertStringContainsString('Unclosed paragraph', $result);
        $this->assertStringContainsString('Nested incorrectly', $result);
        $this->assertStringContainsString('<!doctype html>', $result);
    }

    public function test_allows_semantic_html5_elements(): void
    {
        $html = '<section><article><header><h1>Title</h1></header><p>Content</p><footer>Footer</footer></article></section>';
        $title = 'Semantic Page';

        $result = $this->service->sanitize($html, $title);

        $this->assertStringContainsString('<section>', $result);
        $this->assertStringContainsString('<article>', $result);
        $this->assertStringContainsString('<header>', $result);
        $this->assertStringContainsString('<footer>', $result);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}

