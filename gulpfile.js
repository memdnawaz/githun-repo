var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    cssmin     = require('gulp-cssmin'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif     = require('gulp-if'),
    del        = require('del');

var env = process.env.NODE_ENV || 'development';

// SASS Task
gulp.task('sass', function() {
    return gulp.src([
            'scss/styles.scss'
        ])
        .pipe(gulpif(env === 'development', sourcemaps.init()))
        .pipe(gulpif(env === 'development', sass({errLogToConsole: true})))
        .pipe(gulpif(env === 'development', sourcemaps.write()))
        .pipe(gulpif(env === 'staging', sourcemaps.init()))
        .pipe(gulpif(env === 'staging', sass({errLogToConsole: true})))
        .pipe(gulpif(env === 'staging', cssmin()))
        .pipe(gulpif(env === 'staging', sourcemaps.write()))
        .pipe(gulpif(env === 'production', sass({errLogToConsole: true})))
        .pipe(gulpif(env === 'production', cssmin()))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('css'));
});

// JS tasks
gulp.task('js', function() {
    return gulp.src([
            'bower_components/underscore/underscore.js',
            'bower_components/modernizr/modernizr.js',
            'bower_components/jquery.nicescroll/index.js',
            'bower_components/foundation/js/foundation.js',
            'bower_components/slick-carousel/slick/slick.js',
            'bower_components/enquire/dist/enquire.js',
            'js_src/init.js'
        ])
        .pipe(gulpif(env === 'development', sourcemaps.init()))
        .pipe(gulpif(env === 'staging', sourcemaps.init()))
        .pipe(gulpif(env === 'staging', uglify()))
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(concat('script.js'))
        .pipe(gulpif(env === 'development', sourcemaps.write()))
        .pipe(gulpif(env === 'staging', sourcemaps.write()))
        .pipe(gulp.dest('js'));
});

// Clean
gulp.task('clean', function(cb) {
    del([
        'css/styles.css',
        'js/script.js'
    ], cb);
});

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('scss/**/*.scss', ['sass']);

    // Watch .js files
    gulp.watch('js_src/**/*.js', ['js']);
});

// Default task
gulp.task('default', ['clean', 'sass', 'js'], function() {

});