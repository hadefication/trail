<?php

namespace Hadefication\Trail;

use Illuminate\Support\Str;
use Illuminate\Routing\Router;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;

class TrailRouteCollection
{

    /**
     * Routes collection container
     *
     * @var Collection
     */
    protected $routes;

    /**
     * Excluded routes container
     *
     * @var array
     */
    protected $excludedRoutes;

    /**
     * Constructor
     *
     * @param Collection $routes
     */
    public function __construct(Router $router) {
        $this->router = $router;
        $this->routes = new Collection();
        $this->excludedRoutes = new Collection(config()->get('trail.excludeRoutes', []));
    }

    /**
     * Compile routes
     *
     * @return Collection
     */
    public function compile()
    {
        foreach ($this->router->getRoutes()->getRoutes() as $route) {
            if (! is_null($route->getName())) {
                $this->routes->push((object)[
                    'uri' => $route->uri(),
                    'name' => $route->getName(),
                    'domain' => $route->domain()
                ]);
            }
        }

        if ($this->excludedRoutes->isNotEmpty()) {
            $this->filter();
        }

        return $this->routes;
    }

    /**
     * Filter collected routes base from the excludedRoutes config
     *
     * @return self
     */
    protected function filter(): self
    {
        $this->excludedRoutes->each(function($excludedRoute) {
            $this->routes = $this->routes->filter(function($route) use ($excludedRoute) {
                return (Str::is($excludedRoute, $route->name) || Str::is($excludedRoute, $route->uri)) === false;
            });
        });
        return $this;
    }
}
