const readline = require('readline');
const fs = require('fs/promises');
const { program } = require('commander');
require('colors');

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

let count = 0;
const logFile = program.opts().file;

const coinToss = () =>
  Math.floor(Math.random() * 2) === 1 ? 'heads' : 'tails';

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
  } catch (err) {
    console.log(`Failed to save file ${logFile}`.red);
  }
};

///////////////////////////////

const path = require('path');
const resultsPath = path.join(__dirname, 'results.txt');

const showResults = async () => {
  const results = await fs.readFile('./results.txt', 'utf-8');
  console.log(results);
};
//////////////////////////////

rl.question('Let`s play? (enter yes to start) ', (answer) => {
  if (answer.toLowerCase() !== 'yes') {
    console.log('Game over');

    showResults();

    rl.close();
    return;
  }

  game();
});

const game = () => {
  rl.question('Are you ready to rumble? ', (answer) => {
    if (answer.toLowerCase() !== 'yes') {
      console.log('Game over');

      log(`Number of coin tosses ${count}`).finally(() => rl.close());

      showResults();

      return;
    }

    count += 1;
    const coinTossValue = coinToss();

    console.log('coinToss', coinTossValue);

    rl.question('Enter heads or tails: '.yellow, (value) => {
      if (value === coinTossValue) {
        console.log(`Congratulations, you won - it was ${coinTossValue}`.green);
        log(
          `Set ${count}. Coin toss: ${coinTossValue}, your answer: ${value}. You won!`
        );
      } else {
        console.log(`You guessed wrong - it was ${coinTossValue}`.red);

        log(
          `Set ${count}. Coin toss: ${coinTossValue}, your answer: ${value}. Casino won!`
        );
      }

      if (count === 5) {
        log(`Number of coin tosses ${count}`).finally(() => rl.close());

        console.log('Game over');

        showResults();

        return;
      } else {
        game();
      }
    });
  });
};
