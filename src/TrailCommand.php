<?php

namespace Hadefication\Trail;

use Illuminate\Console\Command;
use Illuminate\Support\Collection;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Route;

class TrailCommand extends Command
{

    /**
     * Command signature
     *
     * @var string
     */
    protected $signature = 'trail:dump {path=./resources/assets/js/trail.js}';
    
    /**
     * Command description
     *
     * @var string
     */
    protected $description = 'Dump a js file that includes the named routes and route helper that can be included to the build process like Laravel Mix';
    
    /**
     * Filesystem container
     *
     * @var Filesystem
     */
    protected $fs;

    /**
     * Route collection container
     *
     * @var TrailRouteCollection
     */
    protected $routes;

    /**
     * Constructor
     *
     * @param Filesystem $fs
     * @param TrailRouteCollection $routes
     */
    public function __construct(Filesystem $fs, TrailRouteCollection $routes)
    {
        parent::__construct();
        $this->fs = $fs;
        $this->routes = $routes;
    }

    /**
     * Handle
     *
     * @return void
     */
    public function handle()
    {
        $path = $this->argument('path');
        $this->makePath($path);
        $this->fs->put($path, $this->generateJavaScriptContents());
    }

    /**
     * Generate the js contents that will be dump
     *
     * @return string
     */
    public function generateJavaScriptContents()
    {
        $json = $this->routes->compile()->toJson();
        $routeFunction = file_get_contents(__DIR__ . '/../dist/js/route.js');
        return <<<EOT
if(typeof window.Trail === 'undefined' || window.Trail === null)
    throw new Error('Trail Error: @trail blade directive is not yet added: https://github.com/hadefication/trail#blade-directive');
window.Trail.routes = $json;
$routeFunction
EOT;
    }

    /** 
     * Make path
     * 
     * @param string $path                      the path to make
     * @return string
     */
    protected function makePath($path)
    {
        if (!$this->fs->isDirectory(dirname($path))) {
            $this->fs->makeDirectory(dirname($path), 0777, true, true);
        }
        return $path;
    }
}
