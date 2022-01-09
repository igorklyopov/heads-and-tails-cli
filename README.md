# heads-and-tails-cli

[![](https://github.com/igorklyopov/heads-and-tails-cli/workflows/EditorConfig/badge.svg)](https://github.com/igorklyopov/heads-and-tails-cli/actions?query=workflow%3AEditorConfig)

## Description

Console game (utility) "Heads or Tails" (CLI-game). The CLI prompts the user to play a game. If he agrees, a round of five throws is played. The "coin toss" is carried out by entering the answer to the question: Are you ready to rumble? - yes. If the user enters anything other than yes, the round ends. The CLI then prompts the user to choose - heads or tails.

The console utility (CLI) writes the results of the throws to a file, and also shows the user the result of each throw and the result - guessed it or not. After the completion of each round, the CLI shows the player the result: the number of throws in the round, the number of sets when the player won and when the casino won, who won the round. After that, the log file is cleared.

Then the utility offers to play another round or complete the game. If the player leaves, the CLI thanks him for playing. The log file is deleted.

## Prerequisites

1. Latest LTS version of NodeJS
2. npm >= 7

## How to use

- Download or clone the repo.
- Install the game:

  ```sh
  npm i
  ```

- To start game:

  ```sh
  npm run start
  ```

---

Have fun ✌️
