import { route } from '../../src/js/route.js';

beforeEach(() => {
    global.Trail = {  
        routes: [  
            {  
                "uri": "api/user",
                "name": "api.user",
                "domain": null,
                "methods": [  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri": "/",
                "name": "home",
                "domain": null,
                "methods": [  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri": "post",
                "name": "home.post",
                "domain": null,
                "methods": [  
                    "POST"
                ]
            },
            {  
                "uri": "dummy/{username?}",
                "name": "dummy",
                "domain": null,
                "methods": [  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri": "dummy/update/{id}",
                "name": "dummy.update",
                "domain": null,
                "methods": [  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri": "dummy/show/{id}/{order?}",
                "name": "dummy.show",
                "domain": null,
                "methods": [  
                    "GET",
                    "HEAD"
                ]
            },

            {  
                "uri": "dashboard",
                "name": "account.dashboard",
                "domain": "{account}.l56.wip",
                "methods": [  
                    "GET",
                    "HEAD"
                ]
            },

            {  
                "uri": "reports/{id}/{order?}",
                "name": "account.reports",
                "domain": "{account}.l56.wip",
                "methods": [  
                    "GET",
                    "HEAD"
                ]
            }
        ],
        url: "http://l56.wip/",
        scheme: "http",
        domain: "l56.wip",
        port: false
    };
});

test('route can be imported.', () => {
    expect(route).toBeDefined();
});

test(`route('home') will return "http://l56.wip".`, () => {
    expect(route('home')).toBe('http://l56.wip');
});

test(`route('home', null, false) will only return "/".`, () => {
    expect(route('home', null, false)).toBe('/');
});

test(`route('home', false) will only return "/".`, () => {
    expect(route('home', false)).toBe('/');
});

test(`route('dummy') will return "http://l56.wip/dummy".`, () => {
    expect(route('dummy')).toBe('http://l56.wip/dummy');
});

test(`route('dummy', {username: 'charles.boyle'}) will return "http://l56.wip/dummy/charles.boyle".`, () => {
    expect(route('dummy', {username: 'charles.boyle'})).toBe('http://l56.wip/dummy/charles.boyle');
});

test(`route('dummy.update', {id: 1}) will return "http://l56.wip/dummy/update/1".`, () => {
    expect(route('dummy.update', {id: 1})).toBe('http://l56.wip/dummy/update/1');
});

test(`route('dummy.show', {id: 1, order: 'desc'}) will return "http://l56.wip/dummy/show/1/desc".`, () => {
    expect(route('dummy.show', {id: 1, order: 'desc'})).toBe('http://l56.wip/dummy/show/1/desc');
});

test(`route('dummy.update') to throw "Missing required parameters for [Route: dummy.update] [URI: dummy/update/{id}]" error.`, () => {
    expect(() => route('dummy.update')).toThrow();
    expect(() => route('dummy.update')).toThrowError('Missing required parameters for [Route: dummy.update] [URI: dummy/update/{id}]');
});

test(`route('account.dashboard', {account: 'ninenine'}) will return "http://ninenine.l56.wip/dashboard".`, () => {
    expect(route('account.dashboard', {account: 'ninenine'})).toBe('http://ninenine.l56.wip/dashboard');
});

test(`route('account.dashboard', {account: 'ninenine'}, false) will return "/dashboard".`, () => {
    expect(route('account.dashboard', {account: 'ninenine'}, false)).toBe('/dashboard');
});

test(`route('account.reports', {account: 'ninenine', id: 2}) will return "http://ninenine.l56.wip/reports/2".`, () => {
    expect(route('account.reports', {account: 'ninenine', id: 2})).toBe('http://ninenine.l56.wip/reports/2');
});

test(`route() to throw "Too few arguments to function route(), 0 passed.".`, () => {
    expect(() => route()).toThrowError('Too few arguments to function route(), 0 passed.');
});

test(`Trail is not defined to throw "Trail is required".`, () => {
    global.Trail = undefined;
    expect(() => route()).toThrowError('Trail is required');
});

test(`route('home', {param1: 'awesome', param2: 'cool'}) will return "http://l56.wip?param1=awesome&param2=cool".`, () => {
    expect(route('home', {param1: 'awesome', param2: 'cool'})).toBe('http://l56.wip?param1=awesome&param2=cool');
});

test(`route('dummy', {username: 'charles.boyle', order: 'desc', collection: 'images'}) will return "http://l56.wip/dummy/charles.boyle?order=desc&collection=images".`, () => {
    expect(route('dummy', {username: 'charles.boyle', order: 'desc', collection: 'images'})).toBe('http://l56.wip/dummy/charles.boyle?order=desc&collection=images');
});