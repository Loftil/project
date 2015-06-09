'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    browserSync = require("browser-sync"),
    livereload = require('gulp-livereload'),
    notify = require("gulp-notify");
    //reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        php: 'build/php/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        php: 'src/php/*.*',
        js: 'src/js/main.js',
        style: 'src/style/*.scss',
        img: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        php: 'src/php/*.*',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(livereload())
});

gulp.task('php:build', function () {
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
        .pipe(livereload())
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(livereload())
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sass({
            sourceMap: false,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(livereload())
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(livereload())
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'php:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function(){
    livereload.listen();
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
        gulp.src('')
            .pipe(notify({
                title: "HTML changed",
                message: 'Browser reloaded'
            }));
    });
    watch([path.watch.php], function(event, cb) {
        gulp.start('php:build');
        gulp.src('')
            .pipe(notify({
                title: "PHP changed",
                message: 'Browser reloaded'
            }));
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
        gulp.src('')
            .pipe(notify({
                title: "CSS changed",
                message: 'Browser reloaded'
            }));
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
        gulp.src('')
            .pipe(notify({
                title: "JS changed",
                message: 'Browser reloaded'
            }));
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
        gulp.src('')
            .pipe(notify({
                title: "Image changed",
                message: 'Browser reloaded'
            }));
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'watch']);