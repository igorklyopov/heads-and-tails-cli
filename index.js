const readline = require('readline');
const fs = require('fs/promises');
require('colors');
const path = require('path');

const {
  makeLogFile,
  clearLogFile,
  removeLogFile,
} = require('./game-functions/logFileFunctions');
const coinToss = require('./game-functions/coinToss');
const showResults = require('./game-functions/showResults');
const inputFormatter = require('./utils/inputFormatter');

const resultsPath = path.join(__dirname, 'results.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let setCount = 0,
  roundCount = 0;

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

        makeLogFile(`Number of coin tosses ${setCount}`);

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

          makeLogFile(
            `Set ${setCount}. Coin toss: ${coinTossValue}, your answer: ${value}. You won!`
          );
        } else {
          console.log(`You guessed wrong - it was ${coinTossValue}`.red);

          makeLogFile(
            `Set ${setCount}. Coin toss: ${coinTossValue}, your answer: ${value}. Casino won!`
          );
        }

        if (setCount === 5) {
          makeLogFile(`Number of coin tosses ${setCount}`);

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
