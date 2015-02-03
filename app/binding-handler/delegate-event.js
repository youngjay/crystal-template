var _ = require('lodash');
var $ = require('jquery');
var ko = require('knockout');
var eventBindgingHandler = ko.bindingHandlers.event;

// e.g
// delegateEvent: {
//     'click': {
//         'a.page-index': handleIndexClick
//     }
// }

module.exports = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var eventsToHandle = valueAccessor() || {};
        var $element = $(element);
        _.each(eventsToHandle, function(selectorAndHandler, eventName) {

            _.each(selectorAndHandler, function(handler, selector) {
                var delegateEvent = {};

                delegateEvent[eventName] = function($data, e) {
                    var cur;
                    var matches = $element.find(selector);
                    for (cur = e.target; cur && cur !== element; cur = cur.parentNode) {
                        if (matches.index(cur) != -1) {
                            return handler.call(viewModel, ko.dataFor(cur), e);
                        }
                    }

                    // do not stop event
                    return true;
                };

                eventBindgingHandler.init(element, function() {
                    return delegateEvent;
                }, allBindingsAccessor, viewModel, bindingContext);

            });
        });
    }
};
