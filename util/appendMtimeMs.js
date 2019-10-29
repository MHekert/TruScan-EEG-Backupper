const { statSync } = require('fs-extra');

const appendMtimeMs = file => ({
	...file,
	mtimeMs: Math.floor(statSync(file.path).mtimeMs)
});

module.exports = appendMtimeMs;
