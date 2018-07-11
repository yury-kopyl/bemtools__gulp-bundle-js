const PLUGIN_NAME = require('./package').name;

module.exports = {
	isEmptyFile: `${PLUGIN_NAME}: The file is empty`,
	isStream: `${PLUGIN_NAME}: Streaming not supported`,
	isNotHTML: `${PLUGIN_NAME}: The file is not HTML`,
	SWWrong: `${PLUGIN_NAME}: Something went wrong => `,
	fileNotExist: `${PLUGIN_NAME}: File does not exist => `
};