//gulp build script file

// Official ↓
//https://github.com/gulpjs/gulp


const gulp = require('gulp')

const browserSync = require('browser-sync').create()

const del = require('del')

const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps')

const plumber = require('gulp-plumber')

const pug = require('gulp-pug')
const typescript = require('gulp-typescript')

// sorce path
const path = {
  pug: ['./src/*.pug'],
  scripts: ['./src/script/*.ts']
}

// dist path
const distBase = './dist'
const distPath = {
  pug: distBase,
  scripts: distBase + '/js',
}

gulp.task('clean', () => {
  del(distBase)
})


gulp.task('pug', () => {
  gulp.src(path.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(distPath.pug))
})


gulp.task('typescript', () => {

  // target ES5, module commonjs (supported ES6,ES5 default ES3 ^_^:::)
  // mainjsってのにまとめる
  const project = typescript.createProject({
    target: 'ES5',
    module: 'commonjs',
    removeComments: true
  })

  gulp.src(path.scripts)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(project())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(distPath.scripts))
})

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: distBase
    }
  })

  gulp.watch(path.scripts, ['typescript'])
    .on('change',browserSync.reload)
  gulp.watch('./src/*.pug', ['pug'])
    .on('change',browserSync.reload)

})

gulp.task('build',[
  'clean',
  'pug',
  'typescript',
])

// default task －＞　サーバー起動
gulp.task('default', [
  'build',
  'server'
])
