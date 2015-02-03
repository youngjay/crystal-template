var _ = require('lodash');
var ko = require('knockout');
require('./setup-knockout');
var mixin = require('mixin-class');

// setup app
var Page = require('crystal-page');
var State = require('crystal-state');
var App = require('service/app');
var modal = require('service/modal');

var page = new Page();
var state = new State.Location();
var app = new App(state, page, require('./app-config'));
window.app = app;

state.onChange(function() {
    modal.closeAll();
})
// end


// gulpfile里面用到
// 所有的module都会继承这个类，写在gulpfile里面
var ViewModel = require('./vm');

window.vm = function(mixins, html) {
    var vm = ViewModel.extend(mixins);
    if (html) {
        vm.mix({
            __view: html
        })
    }
    return vm;
};
// end

// handle click by state
var $ = require('jquery');

$(document).delegate('a', 'click', function(e) {
    if(this.hasAttribute('external')){
       return;
    }

    if(!this.href){
        return
    }

    state.setData(this.getAttribute('href', 2));

    return false;
});
// end

// setup ajax error
var ajax = require('service/ajax');
var notification = require('service/notification');
ajax.error = function(jqXHR, statusText, error ) {
    notification.error(jqXHR.responseText || error, null, {
        timeOut: 0
    });
};
// end

// start app
app.start();





