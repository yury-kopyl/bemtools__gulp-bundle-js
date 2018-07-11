const ERRORS = require('./errors');
const through = require('through2');
const fs = require('fs');

/**
 *
 * @returns {through} through object and the custom key "classList", which contains an array with a list of classes and JS bundle file
 */
module.exports = params => through.obj(function (file, enc, cb) {
	let options = Object.assign({
		blocksPath: './src/blocks',
		includesPath: '../blocks',
		classList: undefined
	}, params);

	if (file.isStream()) {
		this.emit('error', new Error(ERRORS.isStream));
		cb();
		return;
	}

	if (file.path.slice(-5) !== '.html') {
		this.emit('error', new Error(ERRORS.isNotHTML));
		cb();
		return;
	}

	if (!file.contents.length) {
		this.emit('error', new Error(ERRORS.isEmptyFile));
		cb();
		return;
	}

	try {
		let classes = options.classList ? options.classList : file.classList;
		let fileContent = '';

		classes = classes.filter((value, index) => {
			return classes.indexOf(value) === index && value.slice(-3) === '-js';
		}).map(value => {
			return value.slice(0, -3);
		}).sort();

		classes.forEach(item => {
			let parsedString = item.split('_');
			let fileName = parsedString.length === 1 ? `${item}/${item}` : `${parsedString[0]}/${item}`;
			let className = parsedString.length === 1 ? item : parsedString[0];

			if ( fs.existsSync(`${options.blocksPath}/${fileName}.js`) ) {
				fileContent += `import ${className} from "${options.includesPath}/${fileName}";\n`;
			} else {
				fileContent += `//\t\t⚠ File does not exist ⚠\n// import ${className} from "${options.includesPath}/${fileName}";\n`;
				console.warn(`${ERRORS.fileNotExist}${options.includesPath}/${fileName}.js`);
			}
		});

		file.contents = new Buffer(fileContent);
		file.path = file.path.slice(0, -4);
		file.path += 'js';
		file.classList = classes;
	} catch (err) {
		this.emit('error', new Error(`${ERRORS.SWWrong}${err}`));
		cb();
		return;
	}

	this.push(file);
	cb();
});