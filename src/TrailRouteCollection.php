<?php

namespace Hadefication\Trail;

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
     * Constructor
     *
     * @param Collection $routes
     */
    public function __construct(Collection $routes) {
        $this->routes = $routes;
    }

    /**
     * Compile routes
     *
     * @return Collection
     */
    public function compile()
    {
        foreach (Route::getRoutes()->getRoutes() as $route) {
            $this->routes->push([
                'uri' => $route->uri(),
                'name' => $route->getName(),
                'domain' => $route->getDomain(),
                'methods' => $route->methods(),
            ]);
        }

        return $this->routes;
    }
}
