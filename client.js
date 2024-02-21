const net = require("net");
const { IP, PORT } = require("./constants");

const connect = function () {
  const conn = net.createConnection({
    host:  IP,
    port: PORT
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  // on connect, let player know and write our initials
  conn.on("connect", () => {
    console.log("Successfully connected to game server");
    conn.write("Name: CL");
  });

  // handle incoming data and log it for the player
  conn.on("data", (data) => {
    console.log(data);
  });

  return conn;
};

module.exports = {connect};