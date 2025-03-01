const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const connect = require('gulp-connect');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const options = {
  html: {
    src: "public/*.html",
    dest: "public/*.html"
  },
	pug: {
		src: ["app/views/pages/*.pug", "app/views/blocks/**", "app/views/layouts/**"],
		all: "app/views/**/*.pug",
		dest: "./public"
	},
	scripts: {
		src: "app/scripts/**/*.js",
		dest: "public/scripts"
	},
	styles: {
		src: "app/styles/**/*.scss",
		dest: "public/styles"
	}
};

async function styles() {
  const autoprefixer = await import('gulp-autoprefixer');
  return (
    gulp.src(options.styles.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer.default({
      overrideBrowserslist: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(options.styles.dest))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(options.styles.dest))
    .pipe(connect.reload())
  );
}

function scripts() {
  return (
    gulp.src(options.scripts.src)
    .pipe(plumber())
    .pipe(gulp.dest(options.scripts.dest))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest(options.scripts.dest))
    .pipe(connect.reload())
  );
}

function html() {
  return (
    gulp.src(options.html.src)
    .pipe(plumber())
    .pipe(connect.reload())
  );
}

function views() {
  return (
    gulp.src(options.pug.all)
    .pipe(plumber())
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest(options.pug.dest))
    .pipe(connect.reload())
  )
}

function reload(done) {
  connect.server({
    livereload: true,
    port: 8080
  });
  done();
}

function watchTask(done) {
  gulp.watch(options.html.src, html);
  gulp.watch(options.styles.src, styles);
  gulp.watch(options.scripts.src, scripts);
  gulp.watch(options.pug.src, views);
  done();
}

const watch = gulp.parallel(watchTask, reload);
const build = gulp.series(gulp.parallel(styles, scripts, html, views));

exports.reload = reload;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.views = views;
exports.watch = watch;
exports.build = build;
exports.default = gulp.parallel(watchTask, reload);