const generateNewFileName = lastTriedFileName => {
	const numStr = lastTriedFileName.slice(1, lastTriedFileName.indexOf('.'));
	let incNum = parseInt(numStr);
	if (isNaN(incNum)) throw new Error('wrong filename');
	incNum++;
	const newFileName =
		lastTriedFileName[0] +
		incNum +
		lastTriedFileName.slice(lastTriedFileName.indexOf('.'), lastTriedFileName.length);
	return newFileName;
};

module.exports = generateNewFileName;
