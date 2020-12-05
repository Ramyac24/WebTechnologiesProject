const io = require("socket.io-client");
const socket = io("http://localhost:3001");
socket.on("connect", function () {
  console.log("Connected");
  socket.emit("init", { username: "yojat" });
  socket.on("message", (m) => {
    console.log(m);
  });
});
