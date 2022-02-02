const fs = require('fs/promises');

const { makeLogFile } = require('../../game-functions/logFileFunctions');

jest.spyOn(fs, 'appendFile');
jest.spyOn(fs, 'readFile');

const testData = 'some text data';
const appendFileMock = () =>
  fs.appendFile.mockImplementation(() => `${testData}\n`);
const readFileMock = (expectedResult) =>
  fs.readFile.mockImplementation(() => expectedResult);

beforeEach(() => {
  appendFileMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('makeLogFile', () => {
  test(`should make results.txt in current directory and write to it "${testData}"`, async () => {
    await makeLogFile(testData);

    // the following code will show with which arguments the function was called the first time (calls[0]) - ["results.txt", `${data}\n`]
    expect(fs.appendFile.mock.calls[0]).toEqual([
      'results.txt',
      `${testData}\n`
    ]);
  });

  test('should add the transferred data to the data already in the file and write them from a new line with each call', async () => {
    const MAX_CALLS_COUNT = 5;
    let functionСallsСount = 0;
    const expectedFileContent = `${testData}\n`.repeat(MAX_CALLS_COUNT);

    readFileMock(expectedFileContent);

    while (functionСallsСount <= MAX_CALLS_COUNT) {
      await makeLogFile(testData);
      functionСallsСount += 1;
    }

    // number of lines excluding the last line break
    const linesCount = expectedFileContent.split('\n').length - 1;

    const result = await fs.readFile('results.txt', 'utf-8');

    expect(result).toBe(expectedFileContent);
    expect(linesCount === MAX_CALLS_COUNT).toBeTruthy();
  });
});
