<?php

namespace Hadefication\Trail;

use Illuminate\Support\Arr;

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
     * Constructor
     *
     * @param TrailRouteCollection $routes
     */
    public function __construct(TrailRouteCollection $routes) 
    {
        $this->routes = $routes;
    }

    /**
     * Render directive
     *
     * @return string
     */
    public function render()
    {
        $this->configure();
        $namedRoutes = config()->get('trail.excludeNamedRoutesToDirective', false) ? '[]' : $this->routes->compile()->toJson();
        $routeFunction = config()->get('trail.excludeRouteHelperMethodToDirective', false) ? '' : file_get_contents(__DIR__ . '/../dist/js/blade.js');
        return <<<EOT
<script type="text/javascript">
    var Trail = {routes: $namedRoutes, scheme: "{$this->scheme}", domain: "{$this->domain}", port: $this->port};
    $routeFunction
</script>
EOT;
    }

    /**
     * Setup config settings
     *
     * @return void
     */
    private function configure()
    {
        $url = url('/');
        $parsedUrl = parse_url($url);
        $this->scheme = array_key_exists('scheme', $parsedUrl) ? $parsedUrl['scheme'] : 'http';
        $this->domain = array_key_exists('host', $parsedUrl) ? $parsedUrl['host'] : '';
        $this->port = array_key_exists('port', $parsedUrl) ? $parsedUrl['port'] : 'false';
    }
}
