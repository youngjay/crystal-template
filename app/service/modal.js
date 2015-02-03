var _ = require('lodash');
var mixin = require('mixin-class');
var $ = require('jquery');
var Modal = $.fn.modal.Constructor;
var ko = require('knockout');

var parseTemplate = function(html) {
    var fragments = ko.utils.parseHtmlFragment(html);
    for (var i = 0; i < fragments.length; i++) {
        if (fragments[i].nodeType === 1) {
            return fragments[i];
        }
    }
};

var addModalFunction = function(o) {
    var element = parseTemplate(o.__view);
    document.body.appendChild(element);

    ko.applyBindings(o, element);
    o.__modal = new Modal($(element).hide(), {
        backdrop: 'static',
        keyboard: false   
    });
};

// multiple modal support
$(document).on({
    'shown.bs.modal': function () {
        var zIndex = 1030 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        // setTimeout(function() {
        //     $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        // }, 0);
    },
    'hidden.bs.modal': function() {
        if ($('.modal:visible').length > 0) {
            // restore the modal-open class to the body element, so that scrolling works
            // properly after de-stacking a modal.
            setTimeout(function() {
                $(document.body).addClass('modal-open');
            }, 0);
        }
    }
}, '.modal');

var instances = [];  
var removeFromInstances = function(instance) {
    var index = instances.indexOf(instance);
    if (index !== -1) {
        instances.splice(index, 1);
    }
}

/*
option params

confirm: callback when result confirmed
cancel: callback when canceled
complete: callback when complete

*/
module.exports = function(options) {
    var Class = options.target;
    var instance = Class.instance;

    if (!instance) {
        instance = new Class();
        addModalFunction(instance);
        Class.instance = instance;
    }

    instance.onOpen(options.data, function(result) {
        this.__modal.hide();

        removeFromInstances(this);

        var context = options.context;

        if (arguments.length === 0) {
            if (options.cancel) {
                options.cancel.call(context);
            }
        }
        else {
            if (options.confirm) {
                options.confirm.call(context, result);
            }
        }

        if (options.complete) {
            options.complete.call(context);
        }
    });

    instance.__modal.show();

    instances.push(instance);
};

module.exports.closeAll = function() {
    instances.forEach(function(instance) {
        instance.__modal.hide();
    });
    instances.length = 0;
};