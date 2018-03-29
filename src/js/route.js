import get from 'lodash.get';
import isNull from 'lodash.isnull';
import isUndefined from 'lodash.isundefined';

class TrailGuide extends String
{
    constructor(name, params, absolute)
    {
        super();
        this.name = name;
        this.params = params;
        this.absolute = absolute;
        console.log('Hi');
        
    }

    parse()
    {
        this.return = 'Hello World!!!';
    }

    url()
    {
        this.parse();
        return this.return;
    }

    toString() {
        return this.url();
    }

    valueOf() {
        return this.url();
    }
}

window.route = function(name, params = {}, absolute = true) {
    return (new TrailGuide(name, params, absolute));
    // let { namedRoutes } = Trail;
    // let route = namedRoutes.find(item => item.name == name);
    // if (isUndefined(route)) {
    //     throw new Error(`Trail Error: '${name}' route doesn't exists`);
    // }

    // console.log(namedRoutes);
    
    // console.log(route);
    

    
    // return 'Hello World!!!';
};