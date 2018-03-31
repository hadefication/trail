import route from '../../src/js/route.js';

beforeEach(() => {
    global.Trail = {  
        routes: [  
            {  
                "uri":"api/user",
                "name":"api.user",
                "domain":null,
                "methods":[  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri":"/",
                "name":"home",
                "domain":null,
                "methods":[  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri":"post",
                "name":"home.post",
                "domain":null,
                "methods":[  
                    "POST"
                ]
            },
            {  
                "uri":"dummy/{username?}",
                "name":"dummy",
                "domain":null,
                "methods":[  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri":"dummy/update/{id}",
                "name":"dummy.update",
                "domain":null,
                "methods":[  
                    "GET",
                    "HEAD"
                ]
            },
            {  
                "uri":"dummy/show/{id}/{order?}",
                "name":"dummy.show",
                "domain":null,
                "methods":[  
                    "GET",
                    "HEAD"
                ]
            }
        ],
        url:"http://l56.wip/",
        scheme:"http",
        domain:"l56.wip",
        port:false
     };
});

test('route is defined.', () => expect(route).toBeDefined());
test(`"route('home')" should return "http://l56.wip".`, () => expect(route('home')).toBe('http://l56.wip'));
test(`"route('home', null, false)" should return "/".`, () => expect(route('home', null, false)).toBe('/'));
test(`"route('dummy.update')" should throw.`, () => expect(() => route('dummy.update')).toThrow());
test(`"route('dummy.update')" should throw "Missing required parameters for [Route: dummy.update] [URI: dummy/update/{id}]".`, () => expect(() => route('dummy.update')).toThrowError('Missing required parameters for [Route: dummy.update] [URI: dummy/update/{id}]'));
test(`"route('dummy.update', {id: 1})" should return "http://l56.wip/dummy/update/1".`, () => expect(route('dummy.update', {id: 1})).toBe('http://l56.wip/dummy/update/1'));
test(`"route('dummy.show', {id: 1, order: 'desc'})" should return "http://l56.wip/dummy/show/1/desc".`, () => expect(route('dummy.show', {id: 1, order: 'desc'})).toBe('http://l56.wip/dummy/show/1/desc'));
test(`"route('dummy.show', {id: 1, order: 'desc', cool: 'cool', awesome: 'epic'})" should return "http://l56.wip/dummy/show/1/desc?cool=cool&awesome=epic".`, () => expect(route('dummy.show', {id: 1, order: 'desc', cool: 'cool', awesome: 'epic'})).toBe('http://l56.wip/dummy/show/1/desc?cool=cool&awesome=epic'));