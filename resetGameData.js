const fs = require('fs');

const readFile = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const writeFile = (path, contents) => fs.writeFileSync(path, contents, 'utf8');

const resetData = (mineField) => {
  mineField.position = 0;
  mineField.playersSquare = [];
  mineField.gameStatus = 'running';
};

const main = (path) => {
  const mineField = readFile(path);
  resetData(mineField);
  writeFile(path, JSON.stringify(mineField));
};

main(process.argv[2]);

exports.readFile = readFile;
exports.writeFile = writeFile;
