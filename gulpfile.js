const { src, dest } = require('gulp');
const gulp =  require('gulp');
const del =require('del');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();

const projectFolder = require('path').join(__dirname, "./dist/accord");
const srcFolder = "src";
const path = {
    build: {
        html: projectFolder+"/",
        css: projectFolder+"/css/",
        js: projectFolder+"/js/",
    },
    src: {
        html: [srcFolder+"/*.html", "!"+srcFolder+"/_*.html"],
        css: srcFolder+"/css/**/*.css",
        js: srcFolder+"/js/**/*.js",
    },
    watch: {
        html: srcFolder+"/**/*.html",
        css: srcFolder+"/css/**/*.css",
        js: srcFolder+"/js/**/*.js",
    },
    clean: projectFolder + "/"
}

function browserSync() {
  browsersync.init({
      server:{
          baseDir: projectFolder + "/"
      },
      port: 3000,
      notify: false
  })
};

function htmlCreate() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
};

function cssCreate() {
    return src(path.src.css)
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"]
            })
        )
        .pipe(concat('index.css'))
        .pipe(cleanCss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
};

function jsCreate() {
    return src([
        './src/js/blocks/switch.js',
        './src/js/blocks/list.js',
        './src/js/index.js'
    ])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('index.js'))
        .pipe(terser())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
};


function watchFiles() {
    gulp.watch([path.watch.html], htmlCreate);
    gulp.watch([path.watch.css], cssCreate);
    gulp.watch([path.watch.js], jsCreate);
};

function clean() {
    return del(path.clean);
};

const build = gulp.series(clean, gulp.parallel( htmlCreate, cssCreate, jsCreate));
const watch = gulp.parallel(build, watchFiles, browserSync);


exports.build = build;
exports.htmlCreate = htmlCreate;
exports.cssCreate = cssCreate;
exports.jsCreate = jsCreate;
exports.watch = watch;
exports.default = watch;