const { normalize } = require('path');
const dotenv = require('dotenv');
const { existsSync } = require('fs-extra');

if (existsSync('.env')) dotenv.config({ path: '.env' });

const sourcePath = normalize(process.argv[2] || process.env['SOURCEPATH'] || '');
const destinationPath = normalize(process.argv[3] || process.env['DESTINATIONPATH'] || '');

module.exports = { sourcePath, destinationPath };
