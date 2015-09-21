var gulp = require('gulp');
var david = require('gulp-david');
var deploy = require('gulp-gh-pages');

gulp.task('generate', function () {
});

gulp.task('minify', ['generate'], function () {
});

gulp.task('david', function () {
    return gulp.src('./package.json')
        .pipe(david({ error404: true, errorDepType: true }))
        .pipe(david.reporter);
});

// Deploy to master
gulp.task('deploy', ['minify'], function () {
    return gulp.src('dist/**/*')
        .pipe(deploy({ branch: 'master' }));
});

gulp.task('default', ['generate']);
gulp.task('build', ['minify']);
