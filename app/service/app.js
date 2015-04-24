var _ = require('lodash');

var defaultConfig = {
    redirects: {},
    navs: []
};

module.exports = function(state, page, config) {
    _.defaults(config, defaultConfig);

    var redirects = config.redirects;
    var navs = config.navs;

    var applyRedirect = function(data) {
        if (redirects[data.path]) {
            state.replaceData({
                path: redirects[data.path],
                query: data.query
            });
            return true;
        }
        return false;
    };

    var applyPage = function(data) {
        var module = page.activate(data.path);
        
        if (module.onStateChange) {
            module.onStateChange(data.query);
        }
    };

    var applyTitle = function(data) {
        var path = data.path;
        navs.forEach(function(nav) {
            if (path.indexOf(nav.path) === 0) {
                document.title = nav.text;
            }
        });
    };

    state.onChange(function(data) {
        debugger
        if (!applyRedirect(data)) {            
            applyPage(data);
            applyTitle(data);  
        }  
    });

    return {
        state: state,

        config: config,

        start: function() {
            state.start();        
        }
    }
}