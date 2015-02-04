var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');
var pathUtil = require('path');
var port = 3000;

var ajaxPrefix = '';
var mockServerPath = 'mock-server';

var services = require('./server-config.js');
_.forEach(services, function(config, path) {
    if (!config.status) {
        config.status = 200;
    }
    app[config.method || 'get'](ajaxPrefix + path, function(req, res) {
        res.status(config.status).send(typeof config.response === 'function' ? config.response(req, res) : config.response);
    })
});

app.get(ajaxPrefix + '/services', function(req, res) {
    res.status(200).send(services);
})

var staticIndexPageContent = fs.readFileSync('./index.html');


app.get('*', function(req, res) {
    res.status(200);
    res.set('Access-Control-Allow-Origin', '*')

    var extname = pathUtil.extname(req.url);

    // resource
    if (extname) {
        res.type(extname.substring(1));
        var path = '.' + req.url;
        if (fs.existsSync(path) && fs.statSync(path).isFile()) {
            res.send(fs.readFileSync(path));
        } else {
            res.status(404).send(req.url + ' not found');
        }
    } 
    else {
        // mock server
        var maybeResponseFile = './' + mockServerPath + req.url.replace(ajaxPrefix, '').replace(/\?.*/, '') + '.json';
       
        if (fs.existsSync(maybeResponseFile) && fs.statSync(maybeResponseFile).isFile()) {
            res.type('json');
            res.send(fs.readFileSync(maybeResponseFile));
        }
        // index page 
        else {
            res.type('html');
            res.send(staticIndexPageContent);
        }
    }
});

console.log('server start at: ' + port);
app.listen(port);