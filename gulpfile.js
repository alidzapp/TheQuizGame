'use strict'
//https://www.sitepoint.com/introduction-gulp-js/

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'), //js kód ES6-ról ES5-re fordításához
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets'),
    cssnano = require('cssnano'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify');

// development mode?
//var devBuild = (process.env.NODE_ENV !== 'production');

// folders
var folder = {
    src: 'src/',
    build: 'build/'
};
////////// js
//gulp.task('js', function() {
//  var jsbuild = gulp.src(folder.src + 'js/**/*');
/*
  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }
  return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
});    */


//gulp.task('default', () => {
//  return gulp.src('src/**/*.js')
/*    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));

});
*/  ////////////// js



gulp.task('sass', function () {
    /*
    var postCssOpts = assets({ loadPaths: ['images/'] });

    if (!devBuild) {
        postCssOpts.push(cssnano);
    }

    */
    return gulp.src('./public/stylesheets/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            //imagePath: 'images/',
            //precision: 3,
            errLogToConsole: true
        }))
        //.pipe(postcss(postCssOpts))
        .pipe(gulp.dest('./public/stylesheets/css'));
});

gulp.task('watch', function () {
    gulp.watch('./public/stylesheets/scss/*.scss', ['sass']);
    gulp.watch('./public/stylesheets/scss/partials/*.scss', ['sass']);
    gulp.watch('./public/stylesheets/scss/pages/*.scss', ['sass']);    
});

gulp.task('default', ['watch']);
