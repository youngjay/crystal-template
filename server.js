var express = require('express');
var app = express();
var fs = require('fs');
var _ = require('lodash');
var pathUtil = require('path');
var port = 3000;

var ajaxPrefix = ''
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
    var path = '.' + req.url;

    res.status(200);

    // static file
    if (fs.existsSync(path) && fs.statSync(path).isFile()) {
        var extname = pathUtil.extname(path);
        if (extname) {
            res.type(extname.substring(1));
        }
        // res.set('Access-Control-Allow-Origin', '*')
        res.send(fs.readFileSync(path));
    }
    // index page 
    else {
        res.type('html');
        res.send(staticIndexPageContent);
    }
});

console.log('server start at: ' + port);
app.listen(port);