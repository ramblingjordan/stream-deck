var gulp = require("gulp")
var ts = require("gulp-typescript")
var nodemon = require("gulp-nodemon")
var tsProject = ts.createProject("tsconfig.json");

gulp.task("compile", function() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("default", ["compile"], function() {
    var stream = nodemon({
        script: "app/main.js",
        watch: "src",
        tasks: ["compile"],
        env: { "DEBUG": "Application,Request,Response" }
    });
    return stream;
});