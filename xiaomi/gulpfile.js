//引入gulp文件
let gulp = require('gulp');
//引入sass文件
let sass = require('gulp-sass')(require('sass'));
//定义gulp-sass文件解析任务
gulp.task('sass',function(){
    return gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./css'));
})
//设置监听实时刷新 获取监听模块 自动解析
let watch = require('gulp-watch');
gulp.task('wch',function(){
    watch('./sass/*.scss',gulp.series(['sass']))
})


