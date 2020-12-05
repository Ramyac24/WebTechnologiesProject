const express = require("express");

const app = express();
const http = require("http");
const socketio = require("socket.io");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var cors = require("cors");

let mongoose = require("mongoose");
let userRouter = require("./routes/userRoute");
const Chat = require("./models/Chat");
const User = require("./models/User");

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/user", userRouter);

var server = http.createServer(app);
var io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

var socketsAndUsername = {};

io.on("connection", (socket) => {
  console.log("New Socket Connected");
  socket.on("init", (data) => {
    console.log(data);
    socketsAndUsername[data.username] = socket.id;
  });

  socket.on("sendMessage", ({ chatID, to, from, message }) => {
    //store in db
    console.log([to, from]);
    Chat.find({ chatID: chatID }, (err, chat) => {
      if (err || chat.length == 0) {
        //create chat session
        //console.log("creating session");
        let arr = [to, from];
        User.update(
          { username: to },
          { $push: { involved: { person: from, chatID: chatID } } },
          (err, doc) => {
            //console.log(err, doc);
          }
        );
        User.update(
          { username: from },
          { $push: { involved: { person: to, chatID: chatID } } },
          (err, doc) => {
            //console.log(err, doc);
          }
        );
        let chatss = new Chat({
          participants: arr,
          chatID: chatID,
          messages: [{ message: message, sender: from }],
        });
        chatss.save();
        io.to(socketsAndUsername[to]).emit("message", [
          { message: message, sender: from },
        ]);
      } else {
        // update session
        //console.log("updating session");
        Chat.update(
          { chatID: chatID },
          { $push: { messages: { message: message, sender: from } } },
          (err, doc) => {
            //console.log(err, doc);
          }
        );
        //console.log(chat[0].messages);
        io.to(socketsAndUsername[to]).emit("message", [
          ...chat[0].messages,
          { message: message, sender: from },
        ]);
      }
    });
    //console.log(socketsAndUsername);
  });
  //console.log(socketsAndUsername);
});

mongoose
  .connect("mongodb://localhost:27017/chathub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(3001, () => {
      console.log(`Server Online on port 3001`);
    });
  })
  .catch(() => console.log("Server Offline. Check Connections"));
