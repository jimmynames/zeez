/*

    Gulpfile for SASS -> CSS conversion, JS combination and minification of Bootstrap files and a custom theme.

*/

// Include Gulp
var gulp = require('gulp');

// Include Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-ruby-sass');
var prefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var size = require('gulp-size');
var bytediff = require('gulp-bytediff');

// Copy the icon fonts to dist folder
gulp.task('copy_fonts', function() {
    gulp.src('./fonts/**')
        .pipe(gulp.dest('./dist/fonts'));
});

// Define Lint Task for JS
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Define a task for converting SASS files to CSS minifying and saving in dist/css folder:
gulp.task('sass', function () {
    return sass('sass/_bootstrap.scss')
        .pipe(prefixer('last 5 versions', 'ie 8'))
        .pipe(rename("styles.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(bytediff.start())
        .pipe(minifycss())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(bytediff.stop());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src([
            // 'js/transition.js',
            // 'js/alert.js',
            // 'js/button.js',
            // 'js/carousel.js',
            // 'js/collapse.js',
            // 'js/dropdown.js',
            // 'js/modal.js',
            // 'js/tooltip.js',
            // 'js/popover.js',
            // 'js/scrollspy.js',
            // 'js/tab.js',
            // 'js/affix.js',
            'js/main.js'
            // 'js/jquery-ui.min.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(bytediff.start())
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(bytediff.stop());
});



// Define a task to watch changes in js and sass folders
gulp.task('watch', function () {
    gulp.watch('js/**/*.js', ['lint', 'scripts']);
    gulp.watch('sass/**/*.scss', ['sass']);
});

// Define a default task
gulp.task('default', ['copy_fonts', 'sass', 'lint', 'scripts', 'watch']);
