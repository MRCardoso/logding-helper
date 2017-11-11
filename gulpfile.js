/*
| --------------------------------------------------------------------
| REQUIRED  
| --------------------------------------------------------------------
*/
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat       = require('gulp-concat'),
    clean       = require('gulp-clean');

/*
| --------------------------------------------------------------------
| GENERATE SCRIPTS COMPLETED
| --------------------------------------------------------------------
*/
gulp.task('scripts-prod',[], function() {
    return gulp.src([
      'src/**/*.js',
      '!src/**/*.backup.js',
    ])
    .pipe(concat('logding-helper.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename('logding-helper.min.js'))
    .pipe(gulp.dest('dist/js'));
});

/*
| --------------------------------------------------------------------
| DFAULT TASK  
| --------------------------------------------------------------------
*/
gulp.task('default', ['scripts-prod'], function(){
    return gulp.src('src/js/logding-helper.tpl.js')
                .pipe(clean({force: true}));
});