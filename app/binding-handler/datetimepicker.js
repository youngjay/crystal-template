var $ = require('jquery');
var ko = require('knockout');
var _ = require('lodash');

var defaultOptions = {
    format: 'YYYY-MM-DD',
    useCurrent:false,
    pickTime:false
};
//defaultDate:value(),

var getInput = function($element) {
    return $element.is('input') ? $element : $element.find('input');
};

var syncObservableAndInputValue = function($element, observable, elToOb) {
    var input = getInput($element);
    var elValue = input.val();
    var obValue = observable();
    if (elValue !== obValue) {
        if (elToOb) {
            observable(elValue);
        }
        else {
            input.val(obValue);
            $element.datetimepicker('update');
        }
    }
};

module.exports = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        var options = ko.toJS(valueAccessor());
        options.defaultDate = valueAccessor().value()===null ? undefined:valueAccessor().value();

        $element.datetimepicker(_.extend({},defaultOptions, options));
        $element.on("dp.change",function() {
            syncObservableAndInputValue($element, valueAccessor().value, true);
        })
    },

    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        syncObservableAndInputValue($(element), valueAccessor().value, false);
    },

    config: function(options) {
        _.extend(defaultOptions, options);
    }
};