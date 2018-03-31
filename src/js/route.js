/**!
 * Trail Guide class (route class handler)
 * 
 * @author Glen Bangkila
 * @license MIT
 */
class TrailGuide
{
    constructor(name, params, absolute)
    {
        if (typeof name === 'undefined')
            throw new Error(`Too few arguments to function route(), 0 passed.`);

        this.name = name;
        this.params = params == null ? undefined : params;
        this.absolute = absolute;
        this.trail = Trail;
        this.uri = '';
        this.uriParams = null;
        this.resolve();
    }

    /**
     * Get route 
     * 
     * @return undefined|Object
     */
    getRoute()
    {
        return this.trail.routes.find(item => item.name === this.name);
    }

    /**
     * Resolve uri params
     * 
     * @return {void}
     */
    resolve()
    {
        let uri;
        let params = [];
        let route = this.getRoute();

        if (typeof route === 'undefined')
            throw new Error(`Route [${this.name}] not defined`);

        this.uri = route.uri == '/' ? '' : route.uri;
        this.uriParams = this.validate();
        this.parse();
    }

    /**
     * Validate uri params
     * 
     * @return Array
     */
    validate()
    {
        const validated = [];
        const params = this.uri.match(/{([^}]+)}/gi);
        
        if (params !== null) {
            params.forEach((raw, key) => {
                const param = params[key].slice(1, -1);
                if (this.isParamRequired(raw) && this.isParamNotSupplied(param))
                    throw new Error(`Missing required parameters for [Route: ${this.name}] [URI: ${this.uri}]`);
                validated.push({param: (this.isParamOptional(raw) ? param.slice(0, -1) : param), raw});
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
    isParamOptional(param)
    {
        return param.includes('?');   
    }

    /**
     * Is the param required?
     * 
     * @param {String} param                        the param to check 
     * @return Boolean
     */
    isParamRequired(param)
    {
        return param.includes('?') === false;
    }

    /**
     * Check if the uri param is supplied
     * 
     * @param {String} param                        the param to check 
     * @return Boolean
     */
    isParamSupplied(param)
    {
        if (typeof this.params === 'undefined' ||
            typeof this.params[param] === 'undefined') {
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
    isParamNotSupplied(param)
    {
        return !this.isParamSupplied(param);
    }
    
    /**
     * Append query strings from the supplied params
     * 
     * @param {String} uri                          the uri to append all query string if there's any
     * @return {String}
     */
    appendQueryStrings(uri)
    {
        let qv = [];
        let qs = typeof this.params === 'undefined' ? [] : Object.keys(this.params).filter(param => this.uriParams.map(item => item.param).includes(param) === false);
        qs.forEach(field => {
            const value = this.params[field];
            qv.push(`${field}=${value}`);
        });
        return qv.length ? ([uri, qv.join('&')].join('?')) : uri;
    }

    /**
     * Parse uri params
     * 
     * @return {void}
     */
    parse()
    {
        let uri = this.uri;

        this.uriParams.forEach(item => {
            let { param, raw } = item;
            let value = this.params[param];
            let supplied = typeof this.params[param] !== 'undefined';
            uri = uri.replace(raw, supplied ? value : '');
        });
        
        if (uri.substr(uri.length - 1) === '/')
            uri = uri.substring(0, uri.length - 1);
        
        this.uri = this.appendQueryStrings(uri);
    }

    /**
     * Return the route's URL
     * 
     * @return {String}
     */
    url()
    {
        let { scheme, domain, port } = this.trail;
        let url = [scheme, domain].join('://');

        if (port) 
            url = [url, port].join(':');
        
        if (this.absolute) {
            url = [url, this.uri].join('/');
            if (url.substr(-1) === '/')
                url = url.substring(0, url.length - 1);
            return url;
        }
            

        return `/${this.uri}`;
    }
}

/**
 * Route helper method
 * 
 * @param {String} name                           the route name
 * @param {String} params                         the route parameter
 * @param {Boolean} absolute                      flag to return an absolute or relative URL
 * @return {String}       
 */
const route = function(name, params, absolute = true) {
    const trail = new TrailGuide(name, params, absolute);
    return trail.url();
};

window.route = route;
export default route;