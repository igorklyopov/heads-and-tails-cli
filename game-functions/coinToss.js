/* Function that simulates a coin toss */

const coinToss = () =>
  Math.floor(Math.random() * 2) === 1 ? 'heads' : 'tails';

module.exports = coinToss;
