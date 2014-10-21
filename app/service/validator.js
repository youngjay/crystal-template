var _ = require('lodash');
var mixin = require('mixin-class');

var ko = require('knockout');
var peekObservable = ko.utils.peekObservable;
var slice = [].slice;

var returnTrue = function() {
    return true;
};

var Validator = mixin(
    function(getValueFn, validatorHandlers, getActivateStateFn) {
        this.validatorHandlers = validatorHandlers;
        this.getValueFn = getValueFn;
        this.getActivateStateFn = getActivateStateFn || returnTrue;

        this.errorMsgs = ko.observableArray();
        this.isValid = ko.computed(function() {
            return !this.errorMsgs().length;
        }, this);
    },
    {
        validate: function() {
            var value = this.getValueFn();
            var isActivated = this.getActivateStateFn();
           
            if (isActivated) {        
                this.errorMsgs(this.validatorHandlers.reduce(function(msgs, fn) {
                    var msg = fn(value)
                    if (msg) {
                        msgs.push(msg);
                    }
                    return msgs;
                }, []));
            }
            else {        
                this.errorMsgs([]);
            }
      
        },

        clear: function() {
            this.errorMsgs.removeAll();
        }
    }
);

Validator.api = new Validator(function() {}, []);

module.exports = Validator;