var _ = require('lodash');

var stringifyQuery = function(o) {
    if (typeof o !== 'object') {
        return o;
    }
    var arr = [];
    _.each(o, function(value, key) {
        if (value != null) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    });
    return arr.join('&');
}

/*
    e.g

    var valueTextListCache = require('crystal/util/cache')(function(data, callback) {
        http.get('/resource/category/valueTextList', data, callback);
    })
*/
module.exports = function(handle) {
    var cache = {};
    var pendings = {};

    var fn = function(data, callback) {
        var self = this;

        var key = stringifyQuery(data);

        if (cache[key]) {
            // ensure async
            setTimeout(function() {
                callback.apply(self, cache[key]);
            });                
            return;
        } 

        if (!pendings[key]) {
            pendings[key] = [];
            setTimeout(function() {
                handle.call(self, data, function() {
                    var args = cache[key] = arguments;
                    
                    pendings[key].forEach(function(p) {
                        p.apply(self, args);
                    });

                    pendings[key].length = 0;
                    delete pendings[key];
                });
            })
        }

        pendings[key].push(callback);
    };

    fn.clearCache = function(data) {
        if (arguments.length) {
            var key = stringifyQuery(data);
            delete cache[key];
        } else {
            for (var i in cache) {
                delete cache[i];
            }
        }
    };

    return fn;
}