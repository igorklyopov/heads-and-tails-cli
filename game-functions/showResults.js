const fs = require('fs/promises');
const path = require('path');

const resultsPath = path.join(__dirname, '../', 'results.txt');

const showResults = async () => {
  const results = await fs.readFile(resultsPath, 'utf-8');
  console.log(results);
};

module.exports = showResults;
