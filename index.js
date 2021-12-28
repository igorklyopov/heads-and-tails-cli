const readline = require('readline');
const fs = require('fs/promises');
const { program } = require('commander');
require('colors');
const path = require('path');
const resultsPath = path.join(__dirname, 'results.txt');

program.option(
  '-f, --file [type]',
  'file for saving game results',
  'results.txt'
);

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let setCount = 0,
  roundCount = 0;
const logFile = program.opts().file;

/////////////////////////////////////
const coinToss = () =>
  Math.floor(Math.random() * 2) === 1 ? 'heads' : 'tails';

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

const showResults = async () => {
  const results = await fs.readFile(resultsPath, 'utf-8');
  console.log(results);
};

const inputFormatter = (value) => value.trim().toLowerCase();

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
/////////////////////////////////////

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

const game = () => {
  rl.question('Are you ready to rumble? '.cyan, async (answer) => {
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

    console.log('coinToss', coinTossValue);

    rl.question('Enter heads or tails: '.yellow, async (value) => {
      if (inputFormatter(value) === coinTossValue) {
        console.log(`Congratulations, you won - it was ${coinTossValue}`.green);

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
  });
};
