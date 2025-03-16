import gulp from 'gulp'
import browserSync from 'browser-sync'
import { deleteAsync as del } from 'del'
import autoprefixer from 'gulp-autoprefixer'
import cleancss from 'gulp-clean-css'
import concat from 'gulp-concat'
import imagemin from 'gulp-imagemin'
import gifsicle from 'imagemin-gifsicle'
import mozjpeg from 'imagemin-mozjpeg'
import optipng from 'imagemin-optipng'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'
import include from 'gulp-include'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import uglify from 'gulp-uglify'
import webp from 'gulp-webp'
import panini from 'panini'
import babel from 'gulp-babel'

const sass = gulpSass(dartSass)
const server = browserSync.create()

// Пути
const paths = {
  src: {
    html: 'src/*.html',
    scss: 'src/assets/scss/**/*.scss',
    js: 'src/assets/js/**/*.js',
    img: 'src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: 'src/assets/fonts/**/*.{ttf,woff,woff2}',
  },
  dist: {
    html: 'dist/',
    css: 'dist/assets/css/',
    css_libs: 'dist/assets/css/libs',
    js: 'dist/assets/js/',
    js_libs: 'dist/assets/js/libs',
    img: 'dist/assets/images/',
    fonts: 'dist/assets/fonts/',
  },
  watch: {
    html: 'src/**/*.html',
    scss: 'src/assets/scss/**/*.scss',
    js: 'src/assets/js/**/*.js',
    img: 'src/assets/images/**/*.{jpg,png,svg,gif,ico,webp}',
  },
}

// Очистка папки dist
export const clean = () => del(['dist'])

// Обработка HTML
export const html = () => {
  panini.refresh()
  return gulp
    .src([paths.src.html, '!src/**/_*.html'])
    .pipe(plumber())
    .pipe(
      panini({
        root: 'src/',
        layouts: 'src/templates/layouts/',
        partials: 'src/templates/partials/',
      })
    )
    .pipe(gulp.dest(paths.dist.html))
    .pipe(server.stream())
}

// Обработка SCSS
export const styles = () => {
  return gulp
    .src(['src/assets/scss/style.scss', 'src/assets/scss/components/**/*'])
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'Plumber SCSS Error',
            message: 'Error: <%= error.message %>',
          })(err)
          this.emit('end')
        },
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(server.stream())
}

export const stylesLibs = () => {
  return gulp
    .src([
      'node_modules/swiper/swiper-bundle.min.css',
      'node_modules/baguettebox.js/dist/baguetteBox.min.css',
    ])
    .pipe(gulp.dest(paths.dist.css_libs))
    .pipe(server.stream())
}

// Обработка JS
export const scripts = () => {
  return gulp
    .src([paths.src.js, '!src/assets/js/components/**/*'])
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'Plumber JS Error',
            message: 'Error: <%= error.message %>',
          })(err)
          this.emit('end')
        },
      })
    )
    .pipe(include())
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(server.stream())
}

export const scriptsLibs = () => {
  return gulp
    .src([
      'node_modules/swiper/swiper-bundle.min.js',
      'node_modules/baguettebox.js/dist/baguetteBox.min.js',
      'node_modules/imask/dist/imask.min.js',
    ])
    .pipe(gulp.dest(paths.dist.js_libs))
    .pipe(server.stream())
}

// Оптимизация изображений
export const images = () => {
  return gulp
    .src([paths.src.img, '!src/assets/images/favicon/**'])
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 85, progressive: true }),
        optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(gulp.dest(paths.dist.img))
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest(paths.dist.img))
}

export const favicon = () => {
  return gulp
    .src('src/assets/images/favicon/**/*')
    .pipe(gulp.dest(paths.dist.html))
}

// Слежение за изменениями
export const watch = () => {
  server.init({
    server: {
      baseDir: 'dist',
    },
    ghostMode: { clicks: false },
    notify: false,
    online: true,
  })

  gulp.watch(paths.watch.html, html)
  gulp.watch(paths.watch.scss, styles)
  gulp.watch(paths.watch.js, scripts)
  gulp.watch(paths.watch.img, images)
}

// Сборка проекта
export const build = gulp.series(
  clean,
  gulp.parallel(html, styles, scripts, stylesLibs, scriptsLibs, images, favicon)
)

// Задача по умолчанию
export default gulp.series(build, watch)
