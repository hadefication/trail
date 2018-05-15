class Route 
{
    constructor(name, params, absolute) 
    {
        if (typeof Trail === 'undefined') {
            throw new Error('Trail is required');
        }
        if (typeof name === 'undefined') {
            throw new Error(`Too few arguments to function route(), 0 passed.`);
        }

        this.name = name;
        this.params = typeof params == 'boolean' ? null: params;
        this.absolute = typeof params == 'boolean' ? params : absolute;
        this.Trail = Trail;
        
        if (typeof this.getRouteDetails() === 'undefined') {
            throw new Error(`Route [${this.name}] not defined`);
        }
    }

    /**
     * Get route details base from the supplied route name
     * 
     * @return {undefined|Object}
     */
    getRouteDetails()
    {
        let { routes } = this.Trail;
        return routes.find(item => item.name === this.name);
    }

    /**
     * Normalize params
     * 
     * @return {Array}
     */
    normalizeParams()
    {
        if (typeof this.params === 'boolean' ||
            typeof this.params === 'undefined' ||
            this.params === null) {
            return [];
        }

        return Object.keys(this.params);
    }

    /**
     * Resolve query strings
     * 
     * @param {String} uri the uri to handle
     * @param {Array} uriParams the collected uri params
     * @return {String}
     */
    resolveQueryStrings(uri, uriParams)
    {
        let paramKeys = uriParams.map(item => item.key);
        let qsKeys = this.normalizeParams().filter(item => paramKeys.includes(item) == false);
        let qs = qsKeys.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(this.params[key])).join('&');

        if (qsKeys.length > 0) {
            return [uri, qs].join('?');
        }

        return uri;
    }

    /**
     * Parse
     * 
     * @param {String} uri the uri to parse
     * @param {Boolean} noQueryString flag to append query strings
     * @return {string}
     */
    parse(uri, noQueryString = false)
    {
        let uriParams = [];
        let matches = uri.match(/{([^}]+)}/gi);
        let suppliedParams = this.normalizeParams();

        if (matches !== null) {
            matches.forEach(item => {
                let param = item.slice(1, -1);
                uriParams.push({
                    raw: item,
                    key: param.replace(/\?$/, ''),
                    required: param.match(/\?$/) === null
                });
            });
    
            this.validateParams(uriParams);
            
            uriParams.forEach(item => {
                let { raw, key, required } = item;
                if (required) {
                    uri = uri.replace(raw, this.params[key]);
                } else {
                    let optional = uri.match(/{([^}]+)\?}/gi);
                    let supplied = suppliedParams.includes(key);
                    uri = uri.replace(raw, (supplied ? this.params[key] : ''));
                }
            });
        }

        if (noQueryString === false) {
            uri = this.resolveQueryStrings(uri, uriParams);
        }

        return this.removeLeadingSlash(uri);
    }

    /**
     * Validate uri params and the supplied params
     * 
     * @param {Array} uriParams the collected uri params
     * @return {void}
     */
    validateParams(uriParams)
    {
        let { uri } = this.getRouteDetails();
        let suppliedParams = this.normalizeParams();
        let requiredParams = uriParams.filter(item => item.required == true).map(item => item.key);
        if (requiredParams.length > 0 && 
            (suppliedParams.length == 0)) {
            throw new Error(`Missing required parameters for [Route: ${this.name}] [URI: ${uri}]`);
        }
    }

    /**
     * Remove trailing slash
     * 
     * @param {String} value the value to handle
     * @return {String}
     */
    removeTrailingSlash(value)
    {
        return value.replace(/\/$/, '');
    }

    /**
     * Remove leading slash
     * 
     * @param {String} value the value to handle
     * @return {String}
     */
    removeLeadingSlash(value)
    {
        return value.replace(/^\//, '');
    }

    /**
     * Generate the URL
     * 
     * @return {String}
     */
    url()
    {
        let { uri, domain: routeDomain } = this.getRouteDetails();
        let { scheme, domain: configDomain, port } = this.Trail;
        let domain = routeDomain == null ? configDomain : routeDomain;
        let base = [scheme, domain].join('://');
        let url = this.parse((uri == '/') ? base : [base, uri].join('/'));

        if (this.absolute === false) {
            url = url.replace(this.parse(base, true), '');
            return url.length == 0 ? '/' : url;
        }

        return this.removeTrailingSlash(url);
    }
}


var route = function(name, params = null, absolute = true) {
    return (new Route(name, params, absolute)).url();
};

export { route };