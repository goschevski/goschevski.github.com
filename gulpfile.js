var gulp = require('gulp');
var sass = require('gulp-sass');
var base64 = require('gulp-base64-inline');
var minify = require('gulp-minify-html');
var smoosher = require('gulp-smoosher');
var deploy = require('gulp-gh-pages');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cp = require('child_process');

// compile sass
gulp.task('sass', function () {
    return gulp.src('_sass/style.scss')
        .pipe(sass())
        .pipe(base64('../img'))
        .pipe(autoprefixer('last 2 version', '> 1%'))
        .pipe(gulp.dest('css'));
});

// jekyll build
gulp.task('jekyll-build', ['sass'], function (done) {
    browserSync.notify('<span style="color: grey">Running:</span> $ jekyll build');
    return cp.spawn('jekyll', ['build'], { stdio: 'ignore' }).on('close', done);
});

// jekyll rebuild & browser sync reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['jekyll-build'], function () {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

// minify html and inline css
gulp.task('minify', ['jekyll-build'], function () {
    return gulp.src('_site/**/*.html')
        .pipe(smoosher())
        .pipe(minify())
        .pipe(gulp.dest('_site/'));
});

// Deploy to master
gulp.task('deploy', ['build'], function () {
    return gulp.src('./_site/**/*')
        .pipe(deploy({ branch: 'master' }));
});

// Watch scss files for changes & recompile, watch html/md files, run jekyll & reload BrowserSync
gulp.task('watch', function () {
    gulp.watch(['_sass/**/*.scss', 'index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

// Compile the sass, compile the jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['minify']);
