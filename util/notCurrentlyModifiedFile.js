const notCurrentlyModifiedFile = e => e.mtimeMs < new Date().getTime() - 1 * 60 * 1000;

module.exports = notCurrentlyModifiedFile;
