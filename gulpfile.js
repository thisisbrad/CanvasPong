const gulp = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');

const paths = {
  scripts: ['./js/index.js', './js/**/*.js'],
  styles: ['./css/styles.css', './css/*.css']
};

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('js:build', () => {
  browserSync.reload();
  return gulp
    .src(paths.scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('js:watch', ['js:build'], done => {
  browserSync.reload();
  done();
});

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['js:watch']);
});

gulp.task('default', ['serve', 'watch']);
