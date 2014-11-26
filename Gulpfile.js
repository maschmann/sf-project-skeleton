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

gulp.task('default', function () {});

/** general task bundlers **/
gulp.task('build-js', ['core-js-' + theme]);
gulp.task('build-css', ['core-sass-' + theme]);

gulp.task('core-sass-default', function () {
    gulp.src([
        './vendor/npm-asset/bootstrap/dist/css/bootstrap.css',
        './vendor/npm-asset/bootstrap/dist/css/bootstrap-theme.css',
        './src/CoreBundle/Resources/sass/core.default.sass',
        './src/CoreBundle/Resources/sass/*.default.sass'
    ])
    .pipe(plugins.sass({sourceComments: 'map'}))
    .pipe(plugins.if(minify, plugins.uglifycss()))
    .pipe(plugins.concat('core.min.css'))
    .pipe(gulp.dest('./web/css/' + env));
});

gulp.task('core-js-default', function() {
    gulp.src([
        './vendor/bower-asset/jquery/dist/jquery.js',
        './vendor/bower-asset/jquery-ui/jquery-ui.js',
        './vendor/npm-asset/bootstrap/dist/js/bootstrap.js',
        './vendor/npm-asset/requirejs/require.js',
        './web/bundles/*/js/**/*.' + theme + '.js'
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('core.min.js'))
    .pipe(plugins.if(minify, plugins.uglify()))
    .pipe(gulp.dest('./web/js/' + env));
});

gulp.task('watch', function () {
    gulp.watch('./web/bundles/*/js/**/*.js', ['build-js']);
    gulp.watch('./src/CoreBundle/Resources/sass/*.scss', ['build-css']);
});
