# Trail
This package will expose a `@trail` blade directive that you can include into your master blade or layout file. This blade directive exposes a `Trail` JavaScript object that contains config and the collection of named routes that your application has. The directive also exposes a helper method named `route` for convenience, if you know what I mean.

## Usage
1. Add this package to your Laravel application by running `composer require hadefication/trail
2. Include `@trail` to your master blade or your main layout file.
3. Start using `route('route.name')` in your JavaScript to access route URLs.
4. That's all about it! Noice eh!?

### Configs
The package comes with a nifty config file where you can customize how the package will behave.

- `excludeNamedRoutesToDirective`: as the config suggests, this config, if set to `true`, it will exclude the routes collection dump in the `Trail` object.
- `excludeRouteHelperMethodToDirective`: yep, if set to `true`, it will exclude the `route` helper method in the JavaScript export done in `@trail` directive.
- `excludeRoutes`: This config accepts an array of route names or route URI path that you wish to be excluded in the route collection dump added in Trail.