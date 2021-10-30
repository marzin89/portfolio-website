// Inkludera gulp
const { src, dest, watch, series, parallel } = require( 'gulp' );
// Inkludera gulp-concat
const concat = require( 'gulp-concat' );
// Inkludera cssnano
const cssnano = require( 'gulp-cssnano' );
// Inkludera gulp-uglify-es
const uglify = require( 'gulp-uglify-es' ).default;
// Inkludera Browsersync
const browserSync = require( 'browser-sync' ).create();
// Inkludera gulp-image
const image = require( 'gulp-image' );
// Inkludera gulp-sass
const sass = require( 'gulp-sass' )( require( 'sass' ));
// Inkludera gulp-babel
const babel = require( 'gulp-babel' );

// Sökvägar till HTML, SASS, JS och bilder
const paths = {
    html: 'src/**/*.html',
    sass: 'src/**/*.scss',
    js: 'src/**/*.js',
    images: 'src/images/*'
}

// Tasks
// Kopiera HTML-filer från src till pub
function htmlTask() {
    return src( paths.html )
    .pipe( dest( 'pub' ));
}

// Kompilera, konkatenera och minifiera SASS-filer från src till pub, ladda om
function sassTask() {
    return src( paths.sass )
    .pipe( sass().on( 'error', sass.logError ))
    .pipe( concat( 'styles.css' ))
    .pipe( cssnano() )
    .pipe( dest( 'pub/css' ))
    .pipe( browserSync.stream() );
}

// Kompilera, konkatenera, minifiera och kopiera JS-filer från src till pub
function jsTask() {
    return src( paths.js )
    .pipe( concat( 'main.js' ))
    .pipe( babel({
        presets: [ "@babel/preset-env" ]
    }))
    .pipe( uglify() )
    .pipe( dest( 'pub/js' ));
}

// Komprimera och kopiera bilder från src till pub
function imageTask() {
    return src( paths.images)
    .pipe( image() )
    .pipe( dest( 'pub/images'  ));
}

// Lyssna efter ändringar och utför samtliga tasks
function watchTask() {

    // Starta en webbserver
    browserSync.init({
        server: "./pub"
    })

    // Lyssna, utför tasks och ladda om webbläsaren
    watch(
        [ paths.html, paths.sass, paths.js, paths.images ],
        parallel( htmlTask, sassTask, jsTask, imageTask )
    ).on( 'change', browserSync.reload );
}

// Exportera tasks
exports.default = series(
    parallel( htmlTask, sassTask, jsTask, imageTask ),
    watchTask
);