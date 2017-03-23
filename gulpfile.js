'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel'); //js kód ES6-ról ES5-re fordításához

/*
gulp.task('default', function () {
  return gulp.src(' todo ')
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
*/

gulp.task('sass', function(){
    return gulp.src('./public/stylesheets/scss/*.scss')
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest('./public/stylesheets/css'));
});

gulp.task('watch', function(){
    gulp.watch('./public/stylesheets/scss/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
