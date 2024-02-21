const connect = require('./client');
const { MOVE_UP_KEY, MOVE_DOWN_KEY, MOVE_LEFT_KEY, MOVE_RIGHT_KEY, TAUNT_1_KEY, TAUNT_2_KEY, TAUNT_3_KEY } = require('./constants');

// Stores the active TCP connection object.
let connection;

// setup interface to handle user input from stdin
const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  const handleUserInput = function (key) {
    const moveKeys = {
      [MOVE_UP_KEY]: 'up',
      [MOVE_DOWN_KEY]: 'down',
      [MOVE_LEFT_KEY]: 'left',
      [MOVE_RIGHT_KEY]: 'right'
    };

    const sayKeys = {
      [TAUNT_1_KEY]: 'haha!',
      [TAUNT_2_KEY]: ':D',
      [TAUNT_3_KEY]: ':('
    };

    if (key === '\u0003') {
      process.exit();
    }
    if (moveKeys[key]) {
      // console.log(`${key} was pressed`);
      conn.write(`Move: ${moveKeys[key]}`);
    }
    if (sayKeys[key]) {
      conn.write(`Say: ${sayKeys[key]}`);
    }
  };

  stdin.on("data", handleUserInput);
  return stdin;
};

module.exports = {setupInput};