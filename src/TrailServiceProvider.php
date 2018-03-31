<?php
namespace Hadefication\Trail;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class TrailServiceProvider extends ServiceProvider
{
    /**
     * Boot
     *
     * @return void
     */
    public function boot()
    {

        $this->mergeConfigFrom(__DIR__.'/config.php', 'trail');

        $this->publishes([
            __DIR__.'/config.php' => config_path('trail.php')
        ], 'config');

        Blade::directive('trail', function () {
            return "<?php echo app('" . TrailBladeDirective::class . "')->render(); ?>";
        });

        if ($this->app->runningInConsole()) {
            $this->commands([
                TrailCommand::class,
            ]);
        }
    }
}
