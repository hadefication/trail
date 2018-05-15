let mix = require('laravel-mix');

mix.js('src/js/route.js', 'dist/js/route.js')
    .js('src/js/blade.js', 'dist/js/blade.js')
    .disableNotifications();