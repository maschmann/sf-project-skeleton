var gulp = require('gulp');

gulp.task('default', function () {});

var sass = sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./web/bundles/acmefrontend/sass/master.scss')
        .pipe(sass({sourceComments: 'map'}))
        .pipe(gulp.dest('./web/css/'));
});

var copy = copy = require('gulp-copy');

gulp.task('fonts', function () {
    return gulp.src('./web/components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*')
        .pipe(copy('./web/fonts', {prefix: 7}));
});
