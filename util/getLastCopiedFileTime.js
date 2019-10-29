const { join } = require('path');
const { maxBy } = require('lodash');
const { destinationPath } = require('./getConfig');
const isExtensionDat = require('./isExtensionDat');
const appendMtimeMs = require('./appendMtimeMs');

const getLastCopiedFileTime = dstFiles => {
	const destinationFilesData = dstFiles
		.filter(isExtensionDat)
		.map(file => ({ fileName: file, path: join(destinationPath, file) }))
		.map(appendMtimeMs);
	const lastCopiedFile = maxBy(destinationFilesData, 'mtimeMs');
	if (lastCopiedFile === undefined) return 0;
	return lastCopiedFile.mtimeMs;
};

module.exports = getLastCopiedFileTime;
