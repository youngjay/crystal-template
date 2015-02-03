var _ = require('lodash');
var ko = require('knockout');
var kom = require('knockout.mapping');
var mixin = require('mixin-class');
ko.setTemplateEngine(require('ko-string-template'));
require('knockout.punches');
ko.punches.enableAll();
ko.punches.attributeInterpolationMarkup.enable();

_.extend(ko.extenders, {
    ensureNumber: function(target) {
        // 强迫文本框进行刷新
        var forceUpdateNull = function() {
            target(target() === null ? undefined : null);
        };

        return ko.computed({
            read: target,

            write: function(v) {
                if (v == null || v === '') {
                    forceUpdateNull()
                    return;
                }

                var ret = v - 0;
                if (isNaN(ret)) {
                    forceUpdateNull()
                    return;
                }
                
                target(ret);

            }
        });
    }
});

ko.filters.json = function(o) {
    return JSON.stringify(ko.unwrap(o), null, 4);
};

(function(config) {    
    var addBinding = function(key, value) {
        bindingHandlers[key] = value;
        if (value.allowVirtual) {
            ko.virtualElements.allowedBindings[key] = true;
        }
    };

    var bindingHandlers = ko.bindingHandlers;
    _.forEach(config, function(value, key) {
        if (Array.isArray(value)) {
            addBinding(key, value[0])
            value[0].config(value[1]);
        }
        else {
            addBinding(key, value);
        }
    });
})({
    module: require('./binding-handler/module'),
    delegateEvent: require('./binding-handler/delegate-event')
});