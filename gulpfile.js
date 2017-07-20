var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	sourceMaps = require('gulp-sourcemaps');

// Configure auto reload task
gulp.task('browser-sync', function(){
	var files = [
		'./*.html',
		'./sass/**/*.scss',
		'./style.css',
		'./**/js/*.js'
	];

	browserSync.init(files, {
		server: '.'
	});

});

// Configure Sass task
gulp.task('sass', function(){
	return gulp.src("sass/**/*.scss")
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass({
         	errLogToConsole: true,
         	outputStyle: 'compressed', 
         	sourceComments: false, 
        }).on('error', sass.logError))
       	.pipe(sourceMaps.write('./'))
        .pipe(gulp.dest("assets/css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync', 'sass'], function(){
	gulp.watch('sass/**/*.scss', ['sass']);
});