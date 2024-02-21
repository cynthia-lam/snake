const connect = require("./client");

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
      'w': 'up',
      's': 'down',
      'a': 'left',
      'd': 'right'
    };

    const sayKeys = {
      '1': 'haha!',
      '2': ':D',
      '3': ':('
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