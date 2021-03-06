/*
| --------------------------------------------------------------------
| REQUIRED  
| --------------------------------------------------------------------
*/
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat       = require('gulp-concat');
const minifyCss    = require('gulp-minify-css');
const clean       = require('gulp-clean');

/*
| --------------------------------------------------------------------
| GENERATE SCRIPTS COMPLETED
| --------------------------------------------------------------------
*/
gulp.task('scripts-prod',[], function() {
    return gulp.src(['src/**/*.js'])
        .pipe(concat('logding-helper.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename('logding-helper.min.js'))
        .pipe(gulp.dest('dist/js'));
});

/*
| --------------------------------------------------------------------
| GENERATE CSS FILE
| --------------------------------------------------------------------
*/
gulp.task('css-prod', function(){
    return gulp.src(['src/css/logding-helper.css', 'src/**/*.css'])
        .pipe(concat('logding-helper.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCss())
        .pipe(rename('logding-helper.min.css'))
        .pipe(gulp.dest('dist/css'));
});
/*
| --------------------------------------------------------------------
| DFAULT TASK  
| --------------------------------------------------------------------
*/
gulp.task('default', ['scripts-prod', 'css-prod'], function(){
    return gulp.src('src/js/logding-helper.tpl.js')
                .pipe(clean({force: true}));
});