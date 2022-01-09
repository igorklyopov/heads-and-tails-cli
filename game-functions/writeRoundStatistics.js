const { makeLogFile } = require('./logFileFunctions');

const writeRoundStatistics = (setCount, playerWinsCount, casinoWinsCount) => {
  makeLogFile(`Number of coin tosses ${setCount}`);
  makeLogFile(`${playerWinsCount} sets you won.`);
  makeLogFile(`${casinoWinsCount} sets won by the casino.`);

  if (playerWinsCount - casinoWinsCount > 0) {
    makeLogFile(`You won this round. Congratulations :)!`);
  } else {
    makeLogFile(`Casino wins this round.`);
  }
};

module.exports = writeRoundStatistics;
