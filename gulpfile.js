// project
var gulp = require('gulp');
var david = require('gulp-david');
var del = require('del');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var notify = require('gulp-notify');

// build and deploy
var deploy = require('gulp-gh-pages');
var smoosher = require('gulp-smoosher');
var minifyHTML = require('gulp-minify-html');

// metalsmith
var nunjucks = require('nunjucks');
var metalsmith = require('gulp-metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var dateFormatter = require('metalsmith-date-formatter');
var excerpts = require('metalsmith-excerpts');

// css
var postcss = require('gulp-postcss');
var cssnext = require('cssnext');
var normalize = require('postcss-normalize');
var assets  = require('postcss-assets');
var nested = require('postcss-nested');
var mixins = require('postcss-mixins');
var extend = require('postcss-extend');
var postcssImport = require('postcss-import');
var minify = require('gulp-minify-css');
var bemLinter = require('postcss-bem-linter');
var reporter = require('postcss-reporter');
var pxtorem = require('postcss-pxtorem');

// configure collections
var collectionsSettings = {
    posts: {
        sortBy: 'date',
        reverse: true
    }
};

// configure nunjucks
nunjucks.configure('./templates', { watch: false });

gulp.task('generate', ['css'], function () {
    return gulp.src(['content/**/*'])
        .pipe(metalsmith({
            root: __dirname,
            frontmatter: true,
            use: [
                collections(collectionsSettings),
                markdown(),
				excerpts(),
                dateFormatter({ dates: [{ key: 'formattedDate', format: 'MMMM YYYY' }] }),
                permalinks({ pattern: ':title', relative: false }),
                templates({ engine: 'nunjucks' })
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('css', function () {
    var processors = [
        normalize,
        postcssImport({
            plugins: [
                mixins(),
                nested(),
                bemLinter(),
                reporter({ throwError: true })
            ]
        }),
        cssnext({ browsers: 'last 2 version, > 1%, ie > 8', url: false }),
        assets({ basePath: 'client/', relativeTo: 'client/css', loadPaths: ['img'], cachebuster: true }),
        extend(),
        pxtorem()
    ];

    return gulp.src('css/style.css')
        .pipe(plumber({ errorHandler: notify.onError('CSS error: <%= error.message %>') }))
        .pipe(postcss(processors))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['generate'], function () {
    return gulp.src('dist/**/*')
        .pipe(smoosher())
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'));
});

gulp.task('david', function () {
    return gulp.src('./package.json')
        .pipe(david({ error404: true, errorDepType: true }))
        .pipe(david.reporter);
});

gulp.task('update', function () {
    return gulp.src('./package.json')
        .pipe(david({ update: true }))
        .pipe(david.reporter)
        .pipe(gulp.dest('./'));
});

// Deploy to master
gulp.task('deploy', ['build'], function () {
    return gulp.src('dist/**/*')
        .pipe(deploy({ branch: 'master' }));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('css/**/*.css', ['css']);
    gulp.watch(['posts/**/*.md', 'templates/**/*.html'], ['generate']);

     gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true
        }));
});

gulp.task('default', ['generate']);
