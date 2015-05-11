var $ = require('jquery');
var ko = require('knockout');
var _ = require('lodash');

var defaultOptions = {};

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
            $element.datepicker('update');
        }
    }
};

module.exports = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        $element.datepicker(_.extend({}, defaultOptions, ko.toJS(valueAccessor())));

        $element.change(function() {
            syncObservableAndInputValue($element, valueAccessor().value, true);
        });
    },

    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        syncObservableAndInputValue($(element), valueAccessor().value, false);
    },

    config: function(options) {
        _.extend(defaultOptions, options);
    }
};