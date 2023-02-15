const gulp = require("gulp");
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const gcmq = require("gulp-group-css-media-queries");
const ghPages = require("gulp-gh-pages");

let isDev = false;
let isProd = !isDev;

function clean() {
  return del("./dist/*");
}

function html() {
  return gulp.src("./src/**/*.html").pipe(gulp.dest("./dist")).pipe(browserSync.stream());
}

function styles() {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(
      gulpIf(
        isProd,
        cleanCSS({
          level: 2,
        })
      )
    )

    .pipe(gulpIf(isDev, sourcemaps.write()))

    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src("./src/img/*").pipe(gulp.dest("./dist/img")).pipe(browserSync.stream());
}

function favicon() {
  return gulp.src("./src/favicon.ico").pipe(gulp.dest("./dist")).pipe(browserSync.stream());
}

function js() {
  return gulp.src("./src/js/main.js").pipe(gulp.dest("./dist/js")).pipe(browserSync.stream());
}

function libs() {
  return gulp
    .src("./node_modules/jquery/dist/jquery.min.js")
    .pipe(gulp.dest("./dist/js/libs"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  });

  gulp.watch("./src/scss/**/*.scss", styles);
  gulp.watch("./src/**/*.html", html);
  gulp.watch("./src/js/main.js", js);
  gulp.watch("./src/img/**/*", images);
}

let build = gulp.parallel(html, styles, images, js, libs, favicon);
let buildWithClean = gulp.series(clean, build);
let dev = gulp.series(buildWithClean, watch, images);

gulp.task("build", build);
gulp.task("buildClean", buildWithClean);
gulp.task("dev", dev);

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});
