// base resolvers that match the API requests on openapi: https://rapidapi.com/transloc/api/openapi-1-2?7
const config = require('../config');
const chalk = require('chalk');
const {queryAPI,queryMapsAPI} = require('../network');
const log = console.log;

const baseResolvers = {

    routes:    (args,context) => {
        return getRoutes(args);
    },
    arrivals:  (args,context) => {
        return getArrivals(args);
    },
    segments:  (args,context) => {
        return getSegments(args);
    },
    vehicles:  (args,context) => {
        return getVehicles(args);
    },
    stops:     (args,context) => {
        return getStops(args);
    },
    alerts:    (args,context) => {
        return getAlerts(args);
    },

};

const getAlerts = args => {

};

const getVehicles = args => {
    log(chalk.green("getting vehicles"));
    const URL = config.API_URL + '/vehicles.json';
    const my_params  = {
        // if routes is undefined set key as null otherwise join it ( changes it from routes : [a,b,c] to routes : "a,b,c". ( Array -> Single String basically)
        routes : Object.is(args['routes'], undefined) ? null : args['routes'].join(',')
    };
    return queryAPI(URL,my_params,true).then(res => {return res});
};

const getStops = args => {
    log(chalk.cyan("getting stops"));
    const URL = config.API_URL + '/stops.json';
    return queryAPI(URL,args).then(res => {return res});
};

// Needs to be unnested.
const getRoutes = args => {
    log(chalk.magenta("getting routes"));
    const URL = config.API_URL + '/routes.json';
    return queryAPI(URL,args,true).then(res => { return res});
};

const getArrivals = args => {
    const URL = config.API_URL + '/arrival-estimates.json';
    return queryAPI(URL,args).then(res => {return res});
};

const getSegments = args => {
    const URL = config.API_URL + '/segments.json';
    return queryAPI(URL,args).then((res) => {
        let segments = [];
        let segment_obj = res['data'];
        Object.keys(segment_obj).forEach((key) => {
            segments.push(segment_obj[key]);
        });
        res['data'] = segments;
        return res;
    });
};

module.exports = {
    baseResolvers,
    getStops,
    getSegments,
    getRoutes,
    getVehicles,
    getArrivals,
};