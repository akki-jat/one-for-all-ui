const { dest, src, series } = require("gulp");
const replace = require("gulp-replace");
require("dotenv").config();

/**
 * Replaces the text in given file
 * @param {string} filePath file path
 * @param {string | RegExp} pattern search pattern
 * @param {string} replacement replacement string
 * @param {string} destination copy destination path
 */
function replaceTextInFile(filePath, pattern, replacement, destination) {
    return src(filePath)
        .pipe(replace(pattern, replacement))
        .pipe(dest(destination));
}

/**
 * Sets core library version
 */
function setCoreLibraryVersion() {
    return replaceTextInFile(
        "./package.json",
        /(?<="version": )(.+)(?=,)/,
        `"${process.env.LIBRARY_VERSION}"`,
        "./"
    );
}

/**
 * Sets react library version
 */
function setReactLibraryVersion() {
    return replaceTextInFile(
        "./bindings/react/package.json",
        /(?<="@one-for-all-ui\/core": |"version": )(.+)(?=")/g,
        `"${process.env.LIBRARY_VERSION}"`,
        "./bindings/react/"
    );
}

exports.setLibraryVersion = exports.default = series(setCoreLibraryVersion, setReactLibraryVersion);
