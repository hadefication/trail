<?php
namespace Hadefication\Trail;

use Illuminate\Support\Facades\Facade;

class TrailFacade extends Facade
{
    /**
     * Get facade accessor
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'trail';
    }
}
