var gulp = require('gulp'),
    //_ = require('lodash'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    theme = 'default',
    env = 'dev',
    minify = false;

/**
 * help!
 */
if (plugins.util.env.help) {
    plugins.util.log(plugins.util.colors.cyan('--------------------------------------------------'));
    plugins.util.log('parameters:');
    plugins.util.log(plugins.util.colors.yellow('--help'), '        shows this help');
    plugins.util.log(plugins.util.colors.yellow('--theme=<name>'), 'theme to create files for');
    plugins.util.log(plugins.util.colors.yellow('--env=<env>'), '   environment to create files for [dev]');
    plugins.util.log(plugins.util.colors.cyan('--------------------------------------------------'));

    return;
}

/**
 * check for commandline params and define defaults
 */
if (plugins.util.env.theme && '' != plugins.util.env.theme) {
    theme = plugins.util.env.theme;
}

if (plugins.util.env.env) {
    env = plugins.util.env.env;
}

var files = {
    css: {
        core: {
            files: [
                './node_modules/bootstrap/dist/css/bootstrap.css',
                './node_modules/bootstrap/dist/css/bootstrap-theme.css',
                './src/AppBundle/Resources/stylus/core.default.styl',
                './src/AppBundle/Resources/stylus/*.default.styl'
            ],
            name: 'core.css',
            dest: './web/assets'
        }
    },
    js: {
        core: {
            files: [
                './node_modules/jquery/dist/jquery.js',
                './node_modules/jquery-ui-bundle/jquery-ui.js',
                './node_modules/bootstrap/dist/js/bootstrap.js',
                './node_modules/requirejs/require.js',
                './src/AppBundle/Resources/public/js/*.' + theme + '.js'
            ],
            name: 'core.js',
            dest: './web/assets'
        }
    }
};

gulp.task('handle-assets', ['build-js', 'build-css']);

gulp.task('default', ['handle-assets']);

gulp.task('watch', ['handle-assets'], function () {
    gulp.watch(files.css.core.files, ['core-stylus-default']);
    gulp.watch(files.js.files,['core-js-default']);
});

/** general task bundlers **/
gulp.task('build-js', ['core-js-' + theme]);
gulp.task('build-css', ['core-stylus-' + theme]);

gulp.task('core-stylus-default', function () {
    gulp.src(files.css.core.files)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
        .pipe(plugins.stylus({compress: minify}))
        .pipe(plugins.concat(files.css.core.name))
        /** .pipe(plugins.autoprefixer('last 2 versions')) **/
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(files.css.core.dest));
});

gulp.task('core-js-default', function() {
    gulp.src(files.js.core.files)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    /*.pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))*/
    .pipe(plugins.concat(files.js.core.name))
    .pipe(plugins.if(minify, plugins.uglify()))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(files.js.core.dest));
});
