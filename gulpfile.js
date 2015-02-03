var _browserify = require('browserify');
var fs = require('fs');
var _ = require('lodash');
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var mkdirp = require('mkdirp');
var through = require('through2');
var glob = require('glob');
var moduleify = require('crystal-modulify');
var path = require('path');
var source = require('vinyl-source-stream');
var ftp = require('gulp-ftp');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

var DIST = 'dist/'
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var COMMON_LIBS = pkg.dependencies;

var PACKAGE_FOLDERS = ['service'];

var browserify = function(opt) {
    return _browserify(_.extend({
        bundleExternal: false
    }, opt));
};

var prependRequireJQuery = function(b) {

    b.transform(function(file) {
        return through(function(src, enc, callback) {
            this.push('var jQuery = require("jquery");\n');
            this.push(src.toString());
            callback();
        })
    });
};

var increaseVersion = function() {
    var versions = (pkg.version || '0.0.0').split('.');
    versions[versions.length - 1] = versions[versions.length - 1] - (-1);

    var newVersion = versions.join('.');
    pkg.version = newVersion;
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));
    console.log(newVersion)
    return newVersion;
};

var app = 'app/**/*.js';


gulp.task('build-index', function() {
    var b = browserify();
    b.add('./app/index');
    return b.bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(DIST))
});

gulp.task('build-node_modules', function() {
    var b = browserify();
    _.forEach(COMMON_LIBS, function(version, name) {
        var exposeName = name === 'knockout-commonjs' ? 'knockout' : name;

        b.require(name, {
            expose: exposeName
        });
    });
    return b.bundle()
        .pipe(source('node_modules.js'))
        .pipe(gulp.dest(DIST))
});

gulp.task('build-jquery-vendors', function() {
    var b = browserify();
    prependRequireJQuery(b);
    b.add('./vendor/bootstrap/js/bootstrap.js');

    // b.add('./vendor/autosize/jquery.autosize.js');
    // b.add('./vendor/datepicker/js/bootstrap-datetimepicker.js');
    // b.add('./vendor/datepicker/js/locales/bootstrap-datetimepicker.zh-CN.js');
    
    b.add('./vendor/jquery.ui/jquery.ui.core.js');
    b.add('./vendor/jquery.ui/jquery.ui.widget.js');
    b.add('./vendor/fileupload/jquery.fileupload.js');
    // b.add('./vendor/jquery.ui/jquery.ui.mouse.js');
    // b.add('./vendor/jquery.ui/jquery.ui.draggable.js');
    // b.add('./vendor/jquery.ui/jquery.ui.sortable.js');
    // b.add('./vendor/transit/jquery.transit.js');

    b.require('./vendor/toastr/toastr.js', {
        expose: 'toastr'
    });
    // b.add('./vendor/typeahead.js/typeahead.bundle.js');


    return b.bundle()
        .pipe(source('jquery-vendors.js'))
        .pipe(gulp.dest(DIST))
});


PACKAGE_FOLDERS.forEach(function(folder) {
    gulp.task('build-' + folder + 's', function(cb) {
        var b = browserify();
        glob.sync('app/' + folder + '/**/*.js').forEach(function(file) {
            b.require('./' + file, {
                expose: file.substring(4/* app/ */, file.indexOf('.'))
            });
        })

        return b.bundle()
            .pipe(source(folder + 's.js'))
            .pipe(gulp.dest(DIST))
    });

})


gulp.task('build-modules', function(cb) {

    var b = browserify({
        extensions: ['.html']
    });

    glob.sync('app/module/**/*.html').forEach(function(file) {
        b.require('./' + file, {
            expose: file.substring(4/* app/ */, file.indexOf('.'))
        });
    })

    b.transform(function(file) {
        return through(function(src, enc, callback) {
            this.push('var model;\n')
            this.push(moduleify(src.toString(), {
                stripWhitespace: true
            }));
            this.push('\n');
            this.push('module.exports=vm(model, __html)');
            callback();
        })

    });
    return b.bundle()
        .pipe(source('modules.js'))
        .pipe(gulp.dest(DIST))
});

gulp.task('clean', function() {
    return gulp.src(DIST, { read: false})
        .pipe(clean())
});

gulp.task('mkdir', ['clean'], function(cb) {
    mkdirp(DIST, cb);
});

gulp.task('watch', function() {
    _.forEach(_.extend({
        'app/asset/*.styl': 'stylus',
        'app/*.js': ['build-index'],
        'app/binding-handler/*.js':  ['build-index'],
        'app/module/**/*.html': 'build-modules',
        'vendor/**/*.*': ['build-jquery-vendors']
    }, PACKAGE_FOLDERS.reduce(function(all, folder) {
        all['app/' + folder + '/**/*.js'] = 'build-' + folder + 's';
        return all;
    }, {})), function(task, file) {
        gulp.watch(file, Array.isArray(task) ? task : [task])
    })
});

gulp.task('compress', function() {
    return gulp.src(DIST + '*.js')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST))
})

gulp.task('copy-vendor-to-dist', function() {
    return gulp.src('vendor/**/*.*')
        .pipe(gulp.dest(DIST + 'vendor'))
});

gulp.task('alpha', function() {
    return gulp.src(DIST + '**/*.*')
        .pipe(ftp({
            host: '192.168.8.174',
            port: 21,
            user: 'e2f',
            pass: '654321',
            remotePath: 'biz-static/' + pkg.name
        }))
});

gulp.task('beta', function() {
    return gulp.src(DIST + '**/*.*')
        .pipe(ftp({
            host: '10.1.2.121',
            port: 21,
            user: 'ba',
            pass: 'eNRicXp3i2M6EAQYBFrQfND7G',
            remotePath: pkg.name + '/' + increaseVersion()
        }))
});

var stylus = require('gulp-stylus');
gulp.task('stylus', function() {
    return gulp.src('app/asset/index.styl')
        .pipe(stylus())
        .pipe(gulp.dest(DIST + 'asset'))
});

gulp.task('copy-image', function() {
    return gulp.src('app/asset/image/**/*.*')
        .pipe(gulp.dest(DIST + 'asset/image'))
});

gulp.task('build', [
    'stylus',
    'build-index',
    'build-node_modules',
    'build-jquery-vendors',
    'build-modules'
].concat(PACKAGE_FOLDERS.map(function(folder) {
    return 'build-' + folder + 's'
})));

gulp.task('default', ['mkdir'], function() {
    gulp.start('build');
    gulp.start('copy-vendor-to-dist');
    gulp.start('copy-image');
});

module.exports = gulp