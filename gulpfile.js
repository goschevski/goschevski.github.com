// project
var gulp = require('gulp');
var david = require('gulp-david');
var del = require('del');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
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
var tags = require('metalsmith-tags');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var codeHighlight = require('metalsmith-code-highlight');
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
var env = nunjucks.configure('./templates', { watch: false });
env.addFilter('stripTags', function (data) {
    return data.replace(/(<([^>]+)>)/ig, '');
});

gulp.task('generate', ['css'], function () {
    return gulp.src(['content/**/*'])
        .pipe(metalsmith({
            root: __dirname,
            frontmatter: true,
            use: [
                collections(collectionsSettings),
                markdown(),
                tags({
                    handle: 'tags',
                    path: 'tags/:tag.html',
                    layout: 'pages/tag.html',
                    sortBy: 'date',
                    reverse: true
                }),
                codeHighlight(),
				excerpts(),
                dateFormatter({ dates: [{ key: 'formattedDate', format: 'MMMM YYYY' }] }),
                permalinks({ pattern: ':title', relative: false }),
                layouts({ directory: 'templates', engine: 'nunjucks' })
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('css', ['clean'], function () {
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

gulp.task('build', ['moveStatic'], function () {
    return gulp.src('dist/**/*.html')
        .pipe(smoosher())
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'));
});

gulp.task('moveStatic', ['generate'], function () {
    return gulp.src(['CNAME', 'favicon.ico', 'favicon.png', 'readme.md', 'robots.txt'])
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

gulp.task('all-watch', ['build'], browserSync.reload);

gulp.task('watch', ['build'], function () {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch(['css/**/*', 'content/**/*', 'templates/**/*'], ['all-watch']);
});

gulp.task('default', ['build']);
