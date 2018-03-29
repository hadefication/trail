<?php

namespace Hadefication\Trail;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Route;

class TrailCommand extends Command
{
    protected $signature = 'trail:dump {path=./resources/assets/js/vendor/trail}';
    
    protected $description = 'Dump a js file that includes the named routes and route helper that can be included to the build process like Laravel Mix';
    
    protected $baseUrl;
    protected $baseProtocol;
    protected $baseDomain;
    protected $basePort;
    protected $router;

    protected $fs;

    public function __construct(Filesystem $fs)
    {
        parent::__construct();
        $this->fs = $fs;
    }

    public function handle()
    {
        $path = $this->argument('path');
        $compiledRoutes = $this->generateJavaScriptContents();
        $routeFunction = file_get_contents(__DIR__ . '/../dist/js/route.js');
        $trailPath = "{$path}/trail.js";
        $routePath = "{$path}/route.js";
        $this->makePath($trailPath);
        $this->makePath($routePath);
        $this->fs->put($trailPath, $compiledRoutes);
        $this->fs->put($routePath, $routeFunction);
    }

    public function generateJavaScriptContents()
    {
        $json = json_encode($this->compiledRoutes());
        return <<<EOT
window.Trail = {
    namedRoutes: $json
};
EOT;
    }

    public function compiledRoutes()
    {
        $routes = new Collection([]);
        foreach (Route::getRoutes()->getRoutes() as $route) {
            $routes->push([
                'uri' => $route->uri(),
                'name' => $route->getName()
            ]);
        }
        return $routes->all();
    }

    protected function makePath($path)
    {
        if (!$this->fs->isDirectory(dirname($path))) {
            $this->fs->makeDirectory(dirname($path), 0777, true, true);
        }
        return $path;
    }
}
