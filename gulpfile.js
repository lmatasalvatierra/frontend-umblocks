const gulp = require('gulp');
const merge = require('merge-stream');
const argv = require('yargs').argv;
const del = require('del');
const dotenv = require('dotenv');
const exec = require('child_process').exec;

const paths = {
  styleguideImages: 'node_modules/cw-styleguide/images/**',
  styleguideFonts: 'node_modules/cw-styleguide/fonts/**',
};

const execute = (cmd, cb) => {
  console.log('Command: ', cmd);
  const command = exec(cmd, cb);

  command.stdout.pipe(process.stdout);
  command.stderr.pipe(process.stderr);
};

gulp.task('clean', () => del(['src/front/compile', 'dist']));

gulp.task('copy', ['clean'], () => {
  const cwFonts = gulp
    .src(paths.styleguideFonts)
    .pipe(gulp.dest('src/client/assets/compile/fonts'));
  const cwImgs = gulp
    .src(paths.styleguideImages)
    .pipe(gulp.dest('src/client/assets/compile/images'));
  return merge(cwFonts, cwImgs);
});

gulp.task('catalog:refresh', cb => {
  let cmd = 'NODE_PATH=src node build/service/loader/loader.js | bunyan';
  if (argv.c || argv.collections) {
    cmd = `NODE_PATH=src node build/service/loader/loader.js --collections=${argv.c ||
      argv.collections} | bunyan`;
  }
  if (argv.e === 'dev') {
    dotenv.config();
    cmd = `NODE_ENV=dev ${cmd}`;
  }
  execute(cmd, cb);
});

gulp.task('dist', ['copy']);
