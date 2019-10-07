/**
 cache API data from Transloc
 cache a map of stop_id's to names
 cache a map of route_id to route_names
 cache all active vehicles?
 cache all active routes?
 update cache every x seconds
 **/

const NodeCache = require( "node-cache" );

const log = console.log;

class Cache {

    static stop_id_stop_name = "stop_id_stop_name";
    static route_id_route_name = "route_id_route_name";

    constructor(checkperiod,deleteOnExpire,errorOnMissing) {
        this.myCache = new NodeCache({checkperiod,deleteOnExpire,errorOnMissing});
    }

    set(key,obj) {
            this.myCache.set(key, obj, (err, success) => {
                if (!err && success) {
                    log(success);
                } else {
                    log("error setting key");
                }
            });
        };

    // update cache via worked thread
    dispatchUpdate(){

    }

    // get item from cache
    get(key){
        this.myCache.get(key, (err, value) => {
            if(!err) {
                if (value == undefined) {
                    log("value not found");
                } else {
                    log(value);
                    return value;
                }
            }
        });
    };

    // clear out cache
    flush  (){
        this.myCache.flushAll();
        this.myCache.close();
    }
}

module.exports = Cache;