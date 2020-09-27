const { dest, src } = require("gulp");
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
 * Sets library version for core and binding projects
 */
function setLibraryVersion() {
    if (process.env.LIBRARY_VERSION) {
        const files = [
            {
                filePath: "./package.json",
                pattern: /(?<="version": )(.+)(?=,)/,
                replacement: `"${process.env.LIBRARY_VERSION}"`,
                destination: "./"
            },
            {
                filePath: "./bindings/react/package.json",
                pattern: /(?<="@one-for-all-ui\/core": |"version": )(.+)(?=")/g,
                replacement: `"${process.env.LIBRARY_VERSION}`,
                destination: "./bindings/react/"
            }
        ];

        return Promise.all(files.map(file => replaceTextInFile(
            file.filePath,
            file.pattern,
            file.replacement,
            file.destination
        )));
    }

    return Promise.resolve();
}

exports.setLibraryVersion = setLibraryVersion;
exports.default = setLibraryVersion;
