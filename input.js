const connect = require('./client');
const { moveKeys, sayKeys } = require('./constants');

// Stores the active TCP connection object.
let connection;

// Setup interface to handle user input from stdin
const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();

  // closure to easily access conn
  const handleUserInput = function (key) {
    // ensure code is able to exit (ctrl + c)
    if (key === '\u0003') {
      process.exit();
    }

    // if key is a move key, send the move to server
    if (moveKeys[key]) {
      // console.log(`${key} was pressed`);
      conn.write(`Move: ${moveKeys[key]}`);
    }

    // if key is a taunt key, send the taunt to server
    if (sayKeys[key]) {
      conn.write(`Say: ${sayKeys[key]}`);
    }
  };

  stdin.on("data", handleUserInput);
  return stdin;
};

module.exports = {setupInput};