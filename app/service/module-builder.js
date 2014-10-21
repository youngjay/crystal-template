var _ = require('lodash');
var mixin = require('mixin-class');
var ko = require('knockout');

var slice = [].slice;
var push = [].push;

var VIEW = '__view';

// var afterRender = function(elements, module) {
//     if (module.afterRender) {
//         module.afterRender(elements);
//     }

//     if (module.dispose) {
//         ko.utils.domNodeDisposal.addDisposeCallback(elements[0], module.dispose.bind(module));
//     }        
// };

module.exports = {
    builders: [],
    typeResolvers: [],

    addBuilder: function() {
        push.apply(this.builders, arguments);
        return this;
    },

    addTypeResolver: function() {
        push.apply(this.typeResolvers, arguments);   
        return this;     
    },

    build: function(mixins, view) {
        var Class = mixin(mixins);

        if (view) {
            Class.prototype[VIEW] = view;
        }

        this.builders.forEach(function(builder) {
            builder(Class);
        });
        
        return Class;
    },

    getViewModel: function() {
        return this.mixModules(_.flatten(slice.call(arguments)));
    },

    mixModules: function(arr) {
        var fns = [];
        var objects = [];
        var self = this;
        arr.forEach(function(o) {
            if (typeof o === 'string') {
                var ret;
                self.typeResolvers.some(function(resolver) {
                    ret = resolver(o);
                    if (ret) {
                        return true;
                    }
                });
                fns.push(ret || require('module/' + o));
                return;
            }
            if (typeof o === 'function') {
                fns.push(o);
                return;
            }
            objects.push(o)
        });

        return fns.length ? new (mixin(fns, objects))() : _.extend.apply(_, objects);
    }
};

