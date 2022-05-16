/* eslint-disable complexity */

const fs = require('fs');
const assert = require('assert');

const readFile = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const writeFile = (path, contents) => fs.writeFileSync(path, contents, 'utf8');

const isPlayerDead = ({ playersSquare, noMines, position }) =>
  playersSquare[position] !== noMines[position];

const isPlayerWon = ({ playersSquare, noMines }) => {
  try {
    assert.deepStrictEqual(playersSquare, noMines);
  } catch (error) {
    return false;
  }

  return true;
};

const padLeft = function (element) {
  return element.padStart(2, 0);
};

const showPlayersPosition = ({ playersSquare, position }, square) =>
  padLeft(square === playersSquare[position] ? '🤪' : '' + square);

const horizontalSquares = function (mineField, squares) {
  const rowSquares = ['|'];

  for (let widthIndex = 1; widthIndex <= mineField.width; widthIndex++) {
    const squaresNumber = squares + widthIndex;
    rowSquares.push(showPlayersPosition(mineField, squaresNumber), '|');
  }

  return rowSquares;
};

const birdViewOfLand = (mineField) => {
  let squares = mineField.length * mineField.width;

  for (let lengthIndex = 1; lengthIndex <= mineField.length; lengthIndex++) {
    const rowSquares = [];
    squares -= mineField.width;
    rowSquares.push(horizontalSquares(mineField, squares));

    console.log(rowSquares.flat().join(' '));
  }
};

const playRound = (mineField) => {
  if (isPlayerDead(mineField) || isPlayerWon(mineField)) {
    mineField.gameStatus = isPlayerWon(mineField) ? 'won' : 'lost';
    mineField.position = 0;
    mineField.playersSquare = [];

    console.log(mineField.gameStatus === 'won' ? '🥳 WON 🥳' : '😩 LOST 😩');
  } else {
    mineField.position++;
  }
};

const playGame = (square, gameDataFile = './mineField.json') => {
  const mineField = readFile(gameDataFile);
  mineField.playersSquare.push(square);

  birdViewOfLand(mineField);
  playRound(mineField);

  writeFile(gameDataFile, JSON.stringify(mineField));
  return mineField;
};

playGame(+process.argv[2]);
