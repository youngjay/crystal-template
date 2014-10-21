var _ = require('lodash');
var ko = require('knockout');

var buildTagRegExp = (function() {
    var tRegExp = _.template('<<%= tag %>>([^<]*)<\\\/<%= tag %>>');

    return function(tag) {
        return new RegExp(tRegExp({tag: tag}), 'img');
    };
})()

require('service/module-builder')
    .addBuilder(
        
        // <module> replacer
        // <module>'module/control/textbox', { value: dealGroupId, 'label': 'dealGroupId' }</module>
        (function() {
            var rModule = buildTagRegExp('module');
            var tModule = _.template('<!-- ko module: require(\'service/module-builder\').getViewModel(<%= o %>) --><!-- /ko -->');

            ko.bindingHandlers['module'] = {
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
                }
            };

            ko.virtualElements.allowedBindings['module'] = true;


            return function(Class) {
                var view = Class.prototype.__view;
                if (view) {
                    Class.prototype.__view = view.replace(rModule, function(m, m1) {
                        return tModule({
                            o: m1
                        });
                    })
                }
            }
        })()
    )

require('./setup-knockout');

var history = require('backbone-history');

var PageController = require('page-controller').extend({
    MODULE_CHILDREN_VIEW_PLACEHOLDER: '{{children}}'
});

var pc = new PageController(document.body);

var redirects = {
};

var applyRedirect = function(path) {
    var redirectedPath = redirects[path];
    if (redirectedPath) {
        history.navigate(redirectedPath, {
            replace: true,
            trigger: true
        });
        return true;
    }
};

pc.onDispatch = function(data) {
    if (applyRedirect(data.path)) {
        return true;
    }
};

history.on('change', function(fragment) {   
    pc.update(fragment);
});

var $ = require('jquery');

$(document).delegate('a', 'click', function(e) {
    var el = e.target;

    if(el.hasAttribute('external')){
       return;
    }

    history.navigate(el.getAttribute('href', 2), {
        trigger: true
    })
    return false;
});

history.start({
    pushState: !ENV.mock
}); 
