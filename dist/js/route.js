/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**!
 * Trail Guide class (route class handler)
 * 
 * @author Glen Bangkila
 * @license MIT
 */
var TrailGuide = function () {
    function TrailGuide(name, params, absolute) {
        _classCallCheck(this, TrailGuide);

        if (typeof name === 'undefined') throw new Error('Too few arguments to function route(), 0 passed.');

        this.name = name;
        this.params = params == null ? undefined : params;
        this.absolute = absolute;
        this.trail = Trail;
        this.uri = '';
        this.uriParams = null;
        this.hasDomain = false;
        this.resolve();
    }

    /**
     * Get route 
     * 
     * @return undefined|Object
     */


    _createClass(TrailGuide, [{
        key: 'getRoute',
        value: function getRoute() {
            var _this = this;

            return this.trail.routes.find(function (item) {
                return item.name === _this.name;
            });
        }

        /**
         * Resolve uri params
         * 
         * @return {void}
         */

    }, {
        key: 'resolve',
        value: function resolve() {
            var uri = void 0;
            var params = [];
            var route = this.getRoute();

            if (typeof route === 'undefined') throw new Error('Route [' + this.name + '] not defined');

            uri = route.uri == '/' ? '' : route.uri;

            if (typeof route.domain !== 'undefined' && route.domain !== null) {
                uri = [route.domain, uri].join('/');
                this.hasDomain = true;
            }

            this.uri = uri;
            this.uriParams = this.validate();
            this.parse();

            console.log(this.uri);
        }

        /**
         * Validate uri params
         * 
         * @return Array
         */

    }, {
        key: 'validate',
        value: function validate() {
            var _this2 = this;

            var validated = [];
            var params = this.uri.match(/{([^}]+)}/gi);

            if (params !== null) {
                params.forEach(function (raw, key) {
                    var param = params[key].slice(1, -1);
                    if (_this2.isParamRequired(raw) && _this2.isParamNotSupplied(param)) throw new Error('Missing required parameters for [Route: ' + _this2.name + '] [URI: ' + _this2.uri + ']');
                    validated.push({ param: _this2.isParamOptional(raw) ? param.slice(0, -1) : param, raw: raw });
                });
            }

            return validated;
        }

        /**
         * Is the param optional?
         * 
         * @param {String} param                        the param to check 
         * @return Boolean
         */

    }, {
        key: 'isParamOptional',
        value: function isParamOptional(param) {
            return param.includes('?');
        }

        /**
         * Is the param required?
         * 
         * @param {String} param                        the param to check 
         * @return Boolean
         */

    }, {
        key: 'isParamRequired',
        value: function isParamRequired(param) {
            return param.includes('?') === false;
        }

        /**
         * Check if the uri param is supplied
         * 
         * @param {String} param                        the param to check 
         * @return Boolean
         */

    }, {
        key: 'isParamSupplied',
        value: function isParamSupplied(param) {
            if (typeof this.params === 'undefined' || typeof this.params[param] === 'undefined') {
                return false;
            }
            return true;
        }

        /**
         * Opposite of isParamSupplied
         * 
         * @param {String} param                        the param to check 
         * @return Boolean
         */

    }, {
        key: 'isParamNotSupplied',
        value: function isParamNotSupplied(param) {
            return !this.isParamSupplied(param);
        }

        /**
         * Append query strings from the supplied params
         * 
         * @param {String} uri                          the uri to append all query string if there's any
         * @return {String}
         */

    }, {
        key: 'appendQueryStrings',
        value: function appendQueryStrings(uri) {
            var _this3 = this;

            var qv = [];
            var qs = typeof this.params === 'undefined' ? [] : Object.keys(this.params).filter(function (param) {
                return _this3.uriParams.map(function (item) {
                    return item.param;
                }).includes(param) === false;
            });
            qs.forEach(function (field) {
                var value = _this3.params[field];
                qv.push(field + '=' + value);
            });
            return qv.length ? [uri, qv.join('&')].join('?') : uri;
        }

        /**
         * Parse uri params
         * 
         * @return {void}
         */

    }, {
        key: 'parse',
        value: function parse() {
            var _this4 = this;

            var uri = this.uri;

            this.uriParams.forEach(function (item) {
                var param = item.param,
                    raw = item.raw;

                var value = _this4.params[param];
                var supplied = typeof _this4.params[param] !== 'undefined';
                uri = uri.replace(raw, supplied ? value : '');
            });

            if (uri.substr(uri.length - 1) === '/') uri = uri.substring(0, uri.length - 1);

            this.uri = this.appendQueryStrings(uri);
        }

        /**
         * Return the route's URL
         * 
         * @return {String}
         */

    }, {
        key: 'url',
        value: function url() {
            var _trail = this.trail,
                scheme = _trail.scheme,
                domain = _trail.domain,
                port = _trail.port;


            if (this.absolute === false) return '/' + this.uri;

            if (this.hasDomain) {
                var url = this.uri;
                if (port !== false) {
                    var segments = url.split('/');

                    console.log(segments);
                    url = url.split('/').splice(1, 0, ':' + port).join('/');
                }

                return url;
            }

            // let url = this.hasDomain ? `${scheme}://` : [scheme, domain].join('://');

            // console.log(url);

            // if (port) 
            //     url = [url, port].join(':');

            // console.log(url);


            // if (this.absolute) {
            //     url = [url, this.uri].join('/');
            //     if (url.substr(-1) === '/')
            //         url = url.substring(0, url.length - 1);

            //     console.log(url);

            //     return url;
            // }


            return '/' + this.uri;
        }
    }]);

    return TrailGuide;
}();

/**
 * Route helper method
 * 
 * @param {String} name                           the route name
 * @param {String} params                         the route parameter
 * @param {Boolean} absolute                      flag to return an absolute or relative URL
 * @return {String}       
 */


var route = function route(name, params) {
    var absolute = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var trail = new TrailGuide(name, params, absolute);
    return trail.url();
};

window.route = route;
exports.default = route;

/***/ })
/******/ ]);