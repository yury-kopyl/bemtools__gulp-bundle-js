[![NPM version](https://img.shields.io/badge/npm-1.0.0-blue.svg)](https://www.npmjs.com/package/@bemtools/gulp-bundle-js)
[![Build Status](https://travis-ci.org/yury-kopyl/bemtools__gulp-bundle-js.svg?branch=master)](https://travis-ci.org/yury-kopyl/bemtools__gulp-bundle-js)

Create bundle JS file with import blocks

## Installation

> npm install @bemtools/gulp-bundle-js @bemtools/gulp-extract-html-class --save

## Sample gulpfile.js

This file will give you a taste of what plugin does.

```javascript
const gulp         = require('gulp');
const extractClass = require('@bemtools/gulp-extract-html-class');
const bundleJS     = require('@bemtools/gulp-bundle-js');

gulp.task('bundle:js', () => {
	gulp.src('./src/html/**/*.html')
		.pipe(extractClass())
		.pipe(bundleJS())
		.pipe(gulp.dest('./src/bundles'))
});
```