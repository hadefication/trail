<?php

namespace Hadefication\Trail;

class TrailBladeDirective
{

    /**
     * Base URL container
     *
     * @var string
     */
    protected $url;
    
    /**
     * Port container
     *
     * @var int/boolean
     */
    protected $port;
    
    /**
     * Scheme container
     *
     * @var string
     */
    protected $scheme;
    
    /**
     * Domain container
     *
     * @var string
     */
    protected $domain;
    
    /**
     * Route collection container
     *
     * @var TrailRouteCollection
     */
    protected $routes;

    /**
     * Settings container
     *
     * @var array
     */
    protected $settings;

    /**
     * Constructor
     *
     * @param TrailRouteCollection $routes
     */
    public function __construct(TrailRouteCollection $routes) 
    {
        $this->routes = $routes;
        $this->settings = config('trail');
    }

    /**
     * Render directive
     *
     * @return string
     */
    public function render()
    {
        $this->config();
        $namedRoutes = $this->settings['excludeNamedRoutesToDirective'] ? '[]' : $this->routes->compile()->toJson();
        $routeFunction = $this->settings['excludeRouteHelperMethodToDirective'] ? '' : file_get_contents(__DIR__ . '/../dist/js/route.js');
        return <<<EOT
<script type="text/javascript">window.Trail = {routes: $namedRoutes, url: "{$this->url}", scheme: "{$this->scheme}", domain: "{$this->domain}", port: $this->port};$routeFunction</script>
EOT;
    }

    /**
     * Setup config settings
     *
     * @return void
     */
    private function config()
    {
        $url = url('/');
        $parsedUrl = parse_url($url);
        $this->url = $url . '/';
        $this->scheme = array_key_exists('scheme', $parsedUrl) ? $parsedUrl['scheme'] : 'http';
        $this->domain = array_key_exists('host', $parsedUrl) ? $parsedUrl['host'] : '';
        $this->port = array_key_exists('port', $parsedUrl) ? $parsedUrl['port'] : 'false';
    }
}
