const readline = require('readline');
require('colors');

const {
  makeLogFile,
  clearLogFile,
  removeLogFile,
} = require('./game-functions/logFileFunctions');
const writeRoundStatistics = require('./game-functions/writeRoundStatistics');
const coinToss = require('./game-functions/coinToss');
const showResults = require('./game-functions/showResults');
const inputFormatter = require('./utils/inputFormatter');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let setCount = 0,
  roundCount = 0,
  casinoWinsCount = 0,
  playerWinsCount = 0;

rl.question('Let`s play? (enter yes to start) '.cyan, (answer) => {
  if (inputFormatter(answer) !== 'yes') {
    console.log('Game over'.blue);

    removeLogFile();
    rl.close();
    return;
  } else {
    roundCount += 1;
    console.log(`Round ${roundCount}`.green);

    game();
  }
});

const startNewRound = () => {
  rl.question('Another round? (enter yes to start) '.cyan, async (answer) => {
    if (inputFormatter(answer) !== 'yes') {
      console.log('Game over. Thanks for playing!'.blue);

      await showResults();
      removeLogFile();
      rl.close();
      return;
    } else {
      setCount = 0;
      casinoWinsCount = 0;
      playerWinsCount = 0;
      roundCount += 1;

      console.log(`Round ${roundCount}`.green);

      clearLogFile();
      game();
    }
  });
};

const game = () => {
  rl.question(
    'Are you ready to rumble? (enter yes to start) '.cyan,
    async (answer) => {
      if (inputFormatter(answer) !== 'yes') {
        console.log(`Round ${roundCount} over`.blue);

        writeRoundStatistics(setCount, playerWinsCount, casinoWinsCount);

        await showResults();
        clearLogFile();
        startNewRound();

        return;
      }

      setCount += 1;

      const coinTossValue = coinToss();

      rl.question('Enter heads or tails: '.yellow, async (value) => {
        if (inputFormatter(value) === coinTossValue) {
          console.log(
            `Congratulations, you won - it was ${coinTossValue}`.green
          );

          playerWinsCount += 1;

          makeLogFile(
            `Set ${setCount}. Coin toss: ${coinTossValue}, your answer: ${value}. You won!`
          );
        } else {
          console.log(`You guessed wrong - it was ${coinTossValue}`.red);

          casinoWinsCount += 1;

          makeLogFile(
            `Set ${setCount}. Coin toss: ${coinTossValue}, your answer: ${value}. Casino won!`
          );
        }

        if (setCount === 5) {
          writeRoundStatistics(setCount, playerWinsCount, casinoWinsCount);

          console.log(`Round ${roundCount} over`.blue);

          await showResults();
          clearLogFile();
          startNewRound();
        } else {
          game();
        }
      });
    }
  );
};
