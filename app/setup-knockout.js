var _ = require('lodash');
var ko = require('knockout');
var kom = require('knockout.mapping');
var mixin = require('mixin-class');
ko.setTemplateEngine(require('ko-string-template'));
require('knockout.punches');
ko.punches.enableAll();
ko.punches.attributeInterpolationMarkup.enable();
