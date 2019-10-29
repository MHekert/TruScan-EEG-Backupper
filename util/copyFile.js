const { join, parse } = require('path');
const { copy, existsSync } = require('fs-extra');
const { sourcePath, destinationPath } = require('./getConfig');
const generateNewFileName = require('./generateNewFileName');

const copyFile = originalFileName => async file => {
	try {
		await copy(join(sourcePath, originalFileName), join(destinationPath, file), {
			overwrite: false,
			errorOnExist: true,
			preserveTimestamps: true
		});

		let originaIniFileName = parse(originalFileName).name + '.ini';
		let iniFile = parse(file).name + '.ini';
		const sourceIniPath = join(sourcePath, originaIniFileName);

		if (existsSync(sourceIniPath))
			await copy(sourceIniPath, join(destinationPath, iniFile), {
				overwrite: false,
				preserveTimestamps: true
			});
		return file;
	} catch (err) {
		const newFileName = generateNewFileName(file);
		return copyFile(originalFileName)(newFileName);
	}
};

module.exports = copyFile;
