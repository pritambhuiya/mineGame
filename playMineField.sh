#! /bin/bash

# sed -i "" "s/won/running/" mineField.json
# sed -i "" "s/lost/running/" mineField.json
node resetGameData.js './mineField.json'
gameStatus=$(grep -o "running" mineField.json)

while [[ ${gameStatus} == "running" ]]
do
  read -p "Enter your move:" move
  node mineField.js ${move}
  gameStatus=$(grep -o "running" mineField.json)
done