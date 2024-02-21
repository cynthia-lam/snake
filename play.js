const connect = require("./client");

const conn = connect();
console.log("Connecting ...");

// setup interface to handle user input from stdin
const setupInput = function (conn) {
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

    if (key === '\u0003') {
      process.exit();
    }
    if (moveKeys[key]) {
      console.log(`${key} was pressed`);
      conn.write(`Move: ${moveKeys[key]}`);
    }
  };

  stdin.on("data", handleUserInput);
  return stdin;
};

setupInput(conn);