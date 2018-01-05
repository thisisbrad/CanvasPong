const gulp = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');

const paths = {
  scripts: ['./src/js/main.js', './src/js/**/*.js'],
  styles: ['./src/css/styles.css', './src/css/*.css'],
  html: ['./src/html/index.html', './src/html/*.html']
};

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('js:build', () => {
  return gulp
    .src(paths.scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('js:watch', ['js:build'], done => {
  browserSync.reload();
  done();
});

gulp.task('html:build', () => {
  return gulp.src(paths.html).pipe(gulp.dest('./build'));
});

gulp.task('html:watch', ['html:build'], function(done) {
  browserSync.reload();
  done();
});

gulp.task('css:build', () => {
  return gulp
    .src(paths.styles)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('css:watch', ['css:build'], done => {
  browserSync.reload();
  done();
});

gulp.task('build', ['html:build', 'js:build', 'css:build']);

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['js:watch']);
  gulp.watch(paths.styles, ['css:watch']);
  gulp.watch(paths.html, ['html:watch']);
});

gulp.task('default', ['build', 'serve', 'watch']);
