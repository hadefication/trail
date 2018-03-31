<?php 

namespace Hadefication\Tests;

use Orchestra\Testbench\TestCase;
use Hadefication\Trail\TrailServiceProvider;

class TrailTestCase extends TestCase
{
    protected function getPackageProviders($app)
    {
        return [
            TrailServiceProvider::class,
        ];
    }
}