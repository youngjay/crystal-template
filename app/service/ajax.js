var $ = require('jquery');
var _ = require('lodash');

var BUSINESS_DATA_TYPE = 'json code-message';

// mock url
if (ENV.mock) {
    $.ajaxPrefilter(BUSINESS_DATA_TYPE, function(options) {
        options.url = 'mock-server/' + options.url + '.json';
    });
}
else {
    $.ajaxPrefilter(BUSINESS_DATA_TYPE, function(options) {
        options.url = '/' + ENV.path + '/' + options.url;
    });
}

// evaluate data
$.ajaxPrefilter(BUSINESS_DATA_TYPE, function(options) {
    if (typeof options.data === 'string') {
        options.contentType = 'application/json; charset=UTF-8';
        return;
    }

    if (typeof options.data === 'function') {
        options.data = options.data.call(options.context);
    }

    // 若有嵌套对象，则用json序列化
    _.forEach(options.data, function(value, key) {
        if (typeof value === 'object') {
            options.data[key] = JSON.stringify(value);
        }
    })

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

    return $.ajax(finalOptions);
};

module.exports.error = function(jqXHR, statusText, error ) {
    alert(jqXHR.responseText || error);
};
