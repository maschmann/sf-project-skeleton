var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    theme = 'default',
    minify = true;

/**
 * check for commandline params and define defaults
 */
if (plugins.util.env.theme) {
    theme = plugins.util.env.theme;
}

if (plugins.util.env.env && plugins.util.env.env !== 'prod') {
    minify = false;
}

gulp.task('default', function () {});

/** general task bundlers **/
gulp.task('build-js', ['core-js-' + theme]);
gulp.task('build-css', ['core-sass-' + theme]);

gulp.task('core-sass-default', function () {
    gulp.src([
        './src/CoreBundle/Resources/sass/core.default.scss',
        './src/CoreBundle/Resources/sass/*.default.scss'
    ])
    .pipe(plugins.sass({sourceComments: 'map'}))
    .pipe(plugins.concat('core.min.css'))
    .pipe(plugins.if(minify, plugins.uglifycss()))
    .pipe(gulp.dest('./web/css/'));
});

gulp.task('core-js-default', function() {
    gulp.src([
        './web/bundles/*/js/**/*.' + theme + '.js',
        './vendor-js/bootstrap-sass-official/vendor/assets/javascripts/*/*.js',
        './vendor-js/jquery/dist/jquery.js',
        './vendor-js/requirejs/require.js'
    ])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('core.min.js'))
    .pipe(plugins.if(minify, plugins.uglify()))
    .pipe(gulp.dest('./web/js'));
});

gulp.task('watch', function () {
    gulp.watch('./web/bundles/*/js/**/*.js', ['build-js']);
    gulp.watch('./src/CoreBundle/Resources/sass/*.scss', ['build-css']);
});