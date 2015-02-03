var ko = require('knockout');


module.exports = {
    'init': function(element, valueAccessor, ignored1, ignored2, bindingContext) {

        var componentViewModel = ko.utils.unwrapObservable(valueAccessor());    

        var template = componentViewModel['__view'];                

        ko.virtualElements.setDomNodeChildren(element, ko.utils.parseHtmlFragment(template));

        var childBindingContext = bindingContext['createChildContext'](componentViewModel);
        ko.applyBindingsToDescendants(childBindingContext, element);

        if (componentViewModel.afterRender) {
            componentViewModel.afterRender(ko.virtualElements.childNodes(element));
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            if (componentViewModel.dispose) {
                componentViewModel.dispose();
            }
        });

        return { 'controlsDescendantBindings': true };
    },

    allowVirtual: true
};
