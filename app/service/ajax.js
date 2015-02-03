var $ = require('jquery');
var _ = require('lodash');

var BUSINESS_DATA_TYPE = 'json code-message';

// mock url
// if (ENV.mock) {
//     $.ajaxPrefilter(BUSINESS_DATA_TYPE, function(options) {
//         options.url = 'mock-server/' + options.url + '.json';
//     });
// }
// else {
//     $.ajaxPrefilter(BUSINESS_DATA_TYPE, function(options) {
//         options.url = '/' + ENV.path + '/' + options.url;
//     });
// }
$.ajaxPrefilter(BUSINESS_DATA_TYPE, function(options) {
    options.url = ENV.ajaxPrefix + options.url;
});

// evaluate data
$.ajaxPrefilter(BUSINESS_DATA_TYPE, function(options) {
    var method = options.method ? options.method.toLowerCase() : 'get';
    
    if (typeof options.data === 'object' && (method === 'post' || method === 'put')) {
        options.contentType = 'application/json; charset=UTF-8';
        options.data = JSON.stringify(options.data);
        return;
    }


    if (options.data &&!(options.data instanceof FormData)) {
        options.data = $.param(options.data);
    }
});

// pre parse code message
$.ajaxSettings.converters[BUSINESS_DATA_TYPE] = function(json) {
    return json;
    // if (json.code === 200) {
    //     return json.data;
    // }

    // throw json.msg;
};

var options0 = {
    dataType: BUSINESS_DATA_TYPE,
    processData: false,
    data: {},
    cache: false,
    success: null,
    error: function(jqXHR, statusText, error) {
        module.exports.error(jqXHR, statusText, error)
    }
};

module.exports = function(options1) {
    var finalOptions = _.extend({}, options0, options1);
    
    // strip extra args
    var success = finalOptions.success;

    finalOptions.success = function(o) {
        success.call(this, o);
    };

    if(ENV.mock){
        setTimeout(function(){
            $.ajax(finalOptions)
        },200)
    }else{
        return $.ajax(finalOptions);
    }
};

module.exports.error = function(jqXHR, statusText, error ) {
    alert(jqXHR.responseText || error);
};
