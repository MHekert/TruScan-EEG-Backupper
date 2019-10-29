const { join } = require('path');
const { readdir } = require('fs-extra');
const { isEmpty } = require('lodash');

const isExtensionDat = require('./util/isExtensionDat');
const getLastCopiedFileTime = require('./util/getLastCopiedFileTime');
const { sourcePath, destinationPath } = require('./util/getConfig');
const appendMtimeMs = require('./util/appendMtimeMs');
const notCurrentlyModifiedFile = require('./util/notCurrentlyModifiedFile');
const copyFile = require('./util/copyFile');

const main = async () => {
	if (sourcePath === destinationPath)
		throw new Error(`Source and destination paths can't be the same`);

	const srcFiles = readdir(sourcePath).catch(err => {
		throw new Error('source directory does not exists');
	});

	const dstFiles = readdir(destinationPath).catch(err => {
		throw new Error('destination directory does not exists');
	});

	await Promise.all([srcFiles, dstFiles]);
	if (isEmpty(await srcFiles)) {
		throw new Error('source directory is empty');
	}
	const lastCopiedFile = getLastCopiedFileTime(await dstFiles);

	const filesToCopy = (await srcFiles)
		.filter(isExtensionDat)
		.map(file => ({ fileName: file, path: join(sourcePath, file) }))
		.map(appendMtimeMs)
		.filter(e => e.mtimeMs > lastCopiedFile)
		.filter(notCurrentlyModifiedFile)
		.map(e => e.fileName)
		.map(file => copyFile(file)(file));

	return await Promise.all(filesToCopy);
};
main().catch(err => console.log(err.message));
