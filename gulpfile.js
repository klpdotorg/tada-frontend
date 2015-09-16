var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  rename: {
    'gulp-ruby-sass': 'sass'
  }
});
var changed = require('gulp-changed');
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var symlink = require('gulp-sym')
 
gulp.task('assets', function(){
  return gulp.src(['./src/assets/fonts/', './src/assets/images/'])
    .pipe(symlink(['./dist/assets/fonts','./dist/assets/images'], {force: true}))
});

gulp.task('clean', function(cb) {
  del([
    'app/tmp'
  ], cb);
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
  return $.sass('sass/style.scss')
    .on('error', $.sass.logError)
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./dist'))
});

/*
gulp.task('styles', function() {
  return gulp.src('./sass/style.scss')
    .pipe($.sass())
    //.pipe($.autoprefixer())
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
});
*/

var bundler = _.memoize(function(watch) {
  var options = {debug: true};

  if (watch) {
    _.extend(options, watchify.args);
  }

  var b = browserify('./src/main.js', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  $.util.log.apply(null, args);
  this.emit('end');
};

function bundle(cb, watch) {
  return bundler(watch).bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function(cb) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  bundle(cb, true);
});

gulp.task('jshint', function() {
  return gulp.src(['./src/**/*.js', './test/**/*.js'])
    .pipe($.plumber())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});

var reporter = 'spec';

gulp.task('mocha', ['jshint'], function() {
  return gulp.src([
    './test/setup/node.js',
    './test/setup/helpers.js',
    './test/unit/**/*.js'
  ], { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: reporter }));
});

gulp.task('build', [
  'clean',
  'html',
  'sass',
  'scripts',
  'assets'
  //'test'
]);

gulp.task('test', [
  'jshint',
  'mocha'
]);

gulp.task('watch', ['build'], function(cb) {
  browserSync({
    server: {
      baseDir: 'dist'
      }    
  });

  reporter = 'dot';
  bundler(true).on('update', function() {
    gulp.start('scripts');
    gulp.start('test');
  });
  gulp.watch('./test/**/*.js', ['test']);
  gulp.watch(['./sass/style.scss', './sass/**/*.scss'], ['sass']);
  gulp.watch(['./src/*.html'], ['html']);
});

gulp.task('default', ['watch']);
