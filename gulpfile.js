// project
var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');

// build and deploy
var deploy = require('gulp-gh-pages');
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

// images
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

// css
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
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

// configure nunjucks
var env = nunjucks.configure('./templates', { watch: false });
env.addFilter('stripTags', data => data.replace(/(<([^>]+)>)/ig, ''));
env.addFilter('json', data => JSON.stringify(data));
env.addGlobal('currentYear', new Date().getFullYear());
env.addGlobal('timestamp', Date.now());

gulp.task('generate', ['css'], function () {
    return gulp.src(['content/**/*'])
        .pipe(metalsmith({
            root: __dirname,
            frontmatter: true,
            use: [
                collections({ posts: { sortBy: 'date', reverse: true }}),
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
        postcssImport({
            plugins: [
                mixins(),
                nested(),
                bemLinter(),
                reporter({ throwError: true })
            ]
        }),
        normalize,
        cssnext({ browsers: 'last 2 version, > 1%, ie > 8', url: false }),
        assets({ basePath: 'static', loadPaths: ['static'], cachebuster: true }),
        extend(),
        pxtorem()
    ];

    return gulp.src('css/style.css')
        .pipe(plumber({ errorHandler: notify.onError('CSS error: <%= error.message %>') }))
        .pipe(postcss(processors))
        .pipe(minify())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['optimizeImages'], function () {
    return gulp.src('dist/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'));
});

gulp.task('optimizeImages', ['generate', 'moveStatic'], function () {
    gulp.src('static/**/*')
        .pipe(changed('build/img'))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist'))
});

gulp.task('moveStatic', function () {
    return gulp.src('static/**/*')
        .pipe(gulp.dest('dist'));
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
