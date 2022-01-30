const coinToss = require('../../game-functions/coinToss');

test("should return 'heads' or 'tails'", () => {
  expect(coinToss()).toMatch(/heads|tails/);
});
