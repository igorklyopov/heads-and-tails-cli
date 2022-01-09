const fs = require('fs/promises');
const path = require('path');
const { program } = require('commander');

program.option(
  '-f, --file [type]',
  'file for saving game results',
  'results.txt'
);

program.parse(process.argv);
const logFile = program.opts().file;

const resultsPath = path.join(__dirname, '../', 'results.txt');

const makeLogFile = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
  } catch (err) {
    console.log(`Failed to save file ${logFile}`.red);
  }
};

const clearLogFile = async () => {
  try {
    await fs.truncate(resultsPath, 0);
  } catch (error) {
    console.log(`Failed to clear file ${logFile}`.red);
  }
};

const removeLogFile = async () => {
  try {
    await fs.unlink(resultsPath);
  } catch (error) {
    console.log(`Failed to remove file ${logFile}`.red);
  }
};

module.exports = { makeLogFile, clearLogFile, removeLogFile };
