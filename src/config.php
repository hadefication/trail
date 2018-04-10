<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Exclude named routes to the @trail directive
    |--------------------------------------------------------------------------
    |
    | This value controls the exclusion of named routes data to the js dump,
    | setting it to true will exclude named routes to the dump.
    */
    'excludeNamedRoutesToDirective' => false,

    /*
    |--------------------------------------------------------------------------
    | Exclude route method function to the @trail directive
    |--------------------------------------------------------------------------
    |
    | This value controls the exclusion of route method helper to the js dump,
    | setting it to true will exclude route method helper to the dump. Use
    | this setting to include route method definition to your build
    | pipeline or if you have your own route method handling.
    */
    'excludeRouteHelperMethodToDirective' => false,

    /*
    |--------------------------------------------------------------------------
    | Excluded routes per uri
    |--------------------------------------------------------------------------
    |
    | This key controls the routes that will not be included in the collection. 
    | You either can use the full uri definition (/users/show/{id} or 
    | /users/*) or the route name (users.show or users.*). See the
    | documentation for more details.
    */
    'excludeRoutes' => [],
];