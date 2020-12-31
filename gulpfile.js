const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const terser = require('gulp-terser')
const rename = require('gulp-rename')
const del = require('del')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const replace = require('gulp-replace')
const imagemin = require('gulp-imagemin')
const plumber = require('gulp-plumber')
const htmlmin = require('gulp-htmlmin')

const paths = {
  entry: './src',
  output: './public',
  html: {
    srcToWatch: './src/html/*.html',
    src: ['./src/*.html', './src/html/*.html'],
    dest: './public',
  },
  styles: {
    src: './src/scss/**/*.scss',
    dest: './public/assets/css',
  },
  scripts: {
    src: './src/js/**/*.js',
    dest: './public/assets/js',
  },
  vendors: {
    src: './src/js/vendors/**/*.js',
    dest: './public/assets/js',
  },
  images: {
    src: './src/images/**/*',
    dest: './public/assets/images',
  },
  favicon: {
    src: './src/favicon.ico',
    dest: './public',
  },
}

const clean = () => del([paths.output])

// Cache busting to prevent browser caching issues
const curTime = new Date().getTime()
const cacheBust = () =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(replace(/cb=\d+/g, `cb=${curTime}`))
    .pipe(gulp.dest(paths.html.dest))

// minify then  Copies all html files
const htmlminOptions = {
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  removeComments: true,
  // sortAttributes: true,
  // sortClassName: true,
  // removeAttributeQuotes: true,
}
const html = () =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(htmlmin(htmlminOptions))
    // .pipe(replace(/cb=\d+/g, `cb=${curTime}`))
    .pipe(gulp.dest(paths.html.dest))

// Convert scss to css, auto-prefix and rename into styles.min.css
const styles = () =>
  gulp
    .src('./src/scss/main.scss')
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'style',
        includePaths: ['node_modules'],
      }).on('error', sass.logError)
    )
    // .pipe(postcss([autoprefixer('last 2 version'), cssnano()]))
    .pipe(
      rename({
        basename: 'style',
        // suffix: '.min',
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())

// Minify all javascript files and concat them into a single app.min.js
const scripts = () =>
  gulp
    .src(paths.scripts.src)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(terser())
    .pipe(concat('app.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))

// Minify all javascript vendors/libs and concat them into a single vendors.min.js
const vendors = () =>
  gulp
    .src(paths.vendors.src)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(terser())
    .pipe(concat('vendors.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.vendors.dest))

// Copy and minify images
const images = () => gulp.src(paths.images.src).pipe(plumber()).pipe(imagemin()).pipe(gulp.dest(paths.images.dest))

// Copy the favicon
const favicon = () => gulp.src(paths.favicon.src).pipe(plumber()).pipe(gulp.dest(paths.favicon.dest))

// Watches all .scss, .js and .html changes and executes the corresponding task
function watchFiles() {
  browserSync.init({
    server: {
      baseDir: './public',
    },

    notify: false,
  })

  gulp.watch(paths.html.src, html).on('change', browserSync.reload)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.vendors.src, vendors).on('change', browserSync.reload)
  // gulp.watch(paths.favicon.src, favicon).on('change', browserSync.reload)
  gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload)
  gulp.watch(paths.images.src, images).on('change', browserSync.reload)
}

const build = gulp.series(clean, gulp.parallel(html, styles, vendors, scripts, images), cacheBust)

const watch = gulp.series(build, watchFiles)

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.vendors = vendors
exports.images = images
// exports.favicon = favicon
exports.watch = watch
exports.build = build
exports.default = build
