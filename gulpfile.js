var gulp = require('gulp')
var ts = require('gulp-typescript')
var tsProject = ts.createProject('tsconfig.json')

function build() {
  console.log('Building...')
  let res = tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'))
  return res
}

gulp.task('watch', () => {
  const watcher = gulp.watch(['src/*.ts'])
  watcher.on('change', () => {
    build()
  })
})
