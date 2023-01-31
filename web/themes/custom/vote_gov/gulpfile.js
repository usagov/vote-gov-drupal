const uswds = require("@uswds/compile");
const {parallel, watch, series, src} = require('gulp');
const gulp = require("gulp");
const gulpStylelint = require('gulp-stylelint');
const browsersync = require('browser-sync').create();
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);

const settings = {
  sass: {
    src: [
      './src/sass/**/*.scss',
      '!./src/sass/_uswds-theme.scss', // Ignore the custom USWDS setting scss files.
    ]
  },
  js: {
    dest: './dist/js',
    minDest: './dist/js/min',
    minSrc: './src/js/**/*.js',
    src: './src/js/**/*.js',
    vendor: {
      dest: './dist/vendor/js',
      src: ['./node_modules/a11y-tabs/dist/a11y-tabs.min.js']
    }
  }
}

function copyFonts() {
  var stream = gulp.src([
    './fonts/**/*',
  ]);

  return stream.pipe(gulp.dest('./dist/assets/fonts'));
}

function copyImg() {
  var stream = gulp.src([
    './img/**/*',
  ]);

  return stream.pipe(gulp.dest('./dist/assets/img'));
}

// JS build function.
function buildJS() {
  return src(settings.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(settings.js.dest))
}

// Vendor JS copy function.
function vendorJS() {
  return src(settings.js.vendor.src)
    .pipe(gulp.dest(settings.js.vendor.dest))
}

// Watch changes on JS and twig files and trigger functions at the end.
function watchJSTwigFiles() {
  watch(
    [
      './src/js/**/*.js',
      './templates/**/*.html.twig'
    ],
    {
      events: 'all',
      ignoreInitial: false
    },
    series(
      vendorJS,
      buildJS,
      browserSyncReload
    )
  );
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Compile CSS from scss.
function buildCompStyles() {
  return src(settings.sass.src)
    .pipe(browsersync.reload({
      stream: true
    }));
}

// Stylelint scss.
function lintScss(done) {
  return gulp.src(settings.sass.src)
    .pipe(gulpStylelint({
      configFile: './.stylelintrc',
      failAfterError: false,
      reporters: [{formatter: "string", console: true}]
    }));
}

// Watch changes on sass files and trigger functions at the end.
function watchCompFiles() {
  watch(settings.sass.src, {
      events: 'all',
      ignoreInitial: false
    },
    series(
      lintScss,
      buildCompStyles
    ));
}

// Init BrowserSync.
function browserSync(done) {
  browsersync.init({
    injectChanges: true,
    logPrefix: 'VOTE gov theme (USWDS)',
    baseDir: './',
    open: false,
    notify: true,
    proxy: 'vote-gov-d10.lndo.site',
    host: 'vote-gov-d10.lndo.site',
    openBrowserAtStart: false,
    reloadOnRestart: true,
    port: 32654,
    ui: false,
  });
  done();
}

/**
 * USWDS version
 */
// Use version 3.
uswds.settings.version = 3;

/**
 * Custom path settings
 * Set as many as you need
 * see https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/#step-4-create-path-settings-and-export-compile-functions
 */
uswds.paths.dist.theme = './src/sass';
uswds.paths.dist.css = './dist/css';
uswds.paths.dist.img = './dist/assets/img';
uswds.paths.dist.fonts = './dist/assets/fonts';
uswds.paths.dist.js = './dist/js';
uswds.paths.src.projectSass = './src/sass';

/**
 * Exports
 * Add as many as you need
 */

// Init project
// init commented out as it is only used once at the very beginning of the project.
// exports.init = uswds.init;

// Various compile functions.
exports.build = series(uswds.copyAssets, vendorJS, buildJS, copyFonts, copyImg, uswds.compile);
exports.compile = uswds.compile;
exports.default = exports.watch = parallel(watchCompFiles, uswds.watch, browserSync, watchJSTwigFiles);
exports.update = uswds.updateUswds;
exports.copyAssets = uswds.copyAssets;
