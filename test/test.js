const assert       = require('assert');
const bundleJS   = require('../');
const ERRORS       = require('../errors');
const gulp         = require('gulp');
const path         = require('path');

const streaming      = () => {
	return path.join(__dirname, '*.html')
};
const classList      = [
	'page-js',
	'header-js',
	'footer-js'
];
const bundledContent = `import footer from "../blocks/footer/footer";
import header from "../blocks/header/header";
import page from "../blocks/page/page";
`;

describe('bundle js', () => {
	it("should return an content file when html has classes", done => {
		gulp.src('./test/has.html')
			.pipe(bundleJS({
				blocksPath: './test/blocks',
				includesPath: '../blocks',
				classList
			}))
			.once('data', data => {
				assert.deepEqual(data.contents.toString(), bundledContent);
				done();
			});
	});

	it("should return an empty file content when the html has no classes", done => {
		gulp.src('./test/has_no.html')
			.pipe(bundleJS({classList: []}))
			.once('data', data => {
				assert.deepEqual(data.contents.toString(), '');
				done();
			});
	});

	it(`should throw the error and display the message "${ERRORS.isEmptyFile}" when file is empty`, done => {
		gulp.src('./test/empty.html')
			.pipe(bundleJS({classList}))
			.once('error', err => {
				assert.strictEqual(err.message, ERRORS.isEmptyFile);
				done();
			});
	});

	it(`should throw the error and display the message "${ERRORS.isNotHTML}" when file is not html`, done => {
		gulp.src('./test/not_html.txt')
			.pipe(bundleJS({classList}))
			.once('error', err => {
				assert.strictEqual(err.message, ERRORS.isNotHTML);
				done();
			});
	});

	it(`should throw the error and display the message "${ERRORS.isStream}" when is stream`, done => {
		gulp.src(streaming(), { buffer: false })
			.pipe(bundleJS({classList}))
			.once('error', err => {
				assert.strictEqual(err.message, ERRORS.isStream);
				done();
			});
	});
});