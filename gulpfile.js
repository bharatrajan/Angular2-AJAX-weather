var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var PATHS = {
    src: 'src/**/*.ts',
    typings: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts',
    html: '**/*.html',
    styles: "src/**/*.scss"
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(PATHS.src)
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('play', ['ts2js'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.src, ['ts2js']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});


// If any ts file changed, transpile ts to js and reload browser
gulp.task('ts-watch', ['ts2js'], function() {
    browserSync.reload();
});

// Launch a development server with auto reload feature
gulp.task('serve', ['ts2js'], function () {
    
    browserSync.init({
        port: 9000,
        logConnections: true,
        logFileChanges: true,
        logSnippet: false,
        open: "local",
        reloadOnRestart: true,
        notify: true,
        server: {
            baseDir: "./"
        }
    });
    
    // Watch for file changes
    gulp.watch(PATHS.src, ['ts-watch']);
    gulp.watch(PATHS.styles, ['sass']);
    gulp.watch(PATHS.html).on("change", browserSync.reload);
});

gulp.task('default', ['serve']);
