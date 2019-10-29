const { extname } = require('path');

const isExtensionDat = e => extname(e) === '.Dat';

module.exports = isExtensionDat;
