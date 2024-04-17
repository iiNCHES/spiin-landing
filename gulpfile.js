'use strict';

const {src, dest, watch, series, parallel} = require('gulp');

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const cheerio = require('gulp-cheerio');


// Create Functions

function compilescss(){
  return src('./app/assets/scss/style.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest('./build/assets/css'))
    .pipe(connect.reload())
}

function jsmin(){
  return src(['./app/assets/js/dep/**/*.js', './app/assets/js/lib/**/*.js', './app/assets/js/app.js'])
    .pipe(concat('app.min.js'))
    .pipe(terser())
    .pipe(dest('./build/assets/js'))
    .pipe(connect.reload())
}

function optimiseimg(){
  return src('./app/assets/images/**/*')
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true, }),
      imagemin.optipng({ optimizationLevel: 2 }),
      imagemin.gifsicle({interlaced: true}),
    ]))
    .pipe(dest('./build/assets/images'))
    .pipe(connect.reload())
}

function compilePug() {
  return src('./app/views/pages/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('./build'))
    .pipe(connect.reload())
}

function svgMap() {
  return src('./app/assets/svg/*.svg')
    .pipe(cheerio({
      run: ($) => {
        $('[fill]').removeAttr('fill');
        $('[class]').removeAttr('class');
        $('[style]').removeAttr('style');            
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(rename({prefix: 'icon-'}))
    .pipe(svgstore())
    .pipe(rename({
        basename: "svg-sprite"
      }))
    .pipe(dest('./build/assets/svg'))
    .pipe(connect.reload())
}

function serveTask() {
  connect.server({
    root: 'build',
    livereload: true,
    port: 8000,
  });
}



// Create Watchtask

function watchTask(){
  watch('./app/assets/scss/**/*.scss', compilescss);
  watch('./app/assets/js/**/*.js', jsmin);
  watch('./app/assets/images/**/*', optimiseimg);
  watch('./app/views/**/*.pug', compilePug);
  watch('./app/assets/svg/**/*.svg', svgMap);
}


// Run Gulp Tasks

exports.default = series(
  compilescss,
  jsmin,
  optimiseimg,
  compilePug,
  svgMap,
  gulp.parallel(serveTask, watchTask)
);