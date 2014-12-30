var gulp = require('gulp'),
    //_ = require('lodash'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    theme = 'default',
    env = 'dev',
    minify = false;

/**
 * check for commandline params and define defaults
 */
if (plugins.util.env.theme) {
    theme = plugins.util.env.theme;
}

if (plugins.util.env.env && plugins.util.env.env == 'prod') {
    minify = true;
    env = 'prod';
}

var files = {
    js: {
        core: [
            './vendor/npm-asset/bootstrap/dist/css/bootstrap.css',
            './vendor/npm-asset/bootstrap/dist/css/bootstrap-theme.css',
            './src/CoreBundle/Resources/sass/core.default.sass',
            './src/CoreBundle/Resources/sass/*.default.sass'
        ]
    },
    css: {
        core: [
            './vendor/bower-asset/jquery/dist/jquery.js',
            './vendor/bower-asset/jquery-ui/jquery-ui.js',
            './vendor/npm-asset/bootstrap/dist/js/bootstrap.js',
            './vendor/npm-asset/requirejs/require.js',
            './web/bundles/*/js/**/*.' + theme + '.js'
        ]
    }
};

gulp.task('handle-assets', ['build-js', 'build-css']);

gulp.task('default', ['build-js', 'build-css'], function () {
    gulp.watch(files.css.core, ['core-sass-default']);
    gulp.watch(files.js.bootstrap,['core-js-default']);
});

/** general task bundlers **/
gulp.task('build-js', ['core-js-' + theme]);
gulp.task('build-css', ['core-sass-' + theme]);

gulp.task('core-sass-default', function () {
    gulp.src(files.css.core)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({sourceComments: 'map'}))
    .pipe(plugins.if(minify, plugins.uglifycss()))
    .pipe(plugins.concat('core.css'))
    .pipe(plugins.autoprefixer('last 2 versions'))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./web/css/' + env));
});

gulp.task('core-js-default', function() {
    gulp.src(files.js.core)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('core.js'))
    .pipe(plugins.if(minify, plugins.uglify()))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./web/js/' + env));
});
