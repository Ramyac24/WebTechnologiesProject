import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./chat.css";
import TextPill from "./TextPill";
const socket = require("socket.io-client")("http://localhost:3001");

const Chat = () => {
  const { state } = useLocation();
  const chattingWith = state.person;
  const username = JSON.parse(localStorage.getItem("session")).username;
  const chatID = state.chatID;
  const [enteredMessage, setenteredMessage] = useState();
  const [message, setMessage] = useState([]);
  const clearMessages = () => {
    setMessage([]);
  };

  useEffect(() => {
    Axios.post("http://localhost:3001/user/getChats", {
      chatID: chatID,
    }).then((res) => {
      const data = res.data;
      console.log(data);
      setMessage(data);
    });

    console.log("Session Connected");
    socket.emit("init", { username: username });
    socket.on("message", (m) => {
      setMessage(m);
    });
    clearMessages();
  }, []);
  socket.on("message", (m) => {
    setMessage(m);
  });
  const sendMessage = (message) => {
    socket.emit("sendMessage", {
      chatID: chatID,
      to: chattingWith,
      message: message,
      from: username,
    });
  };

  const messageView = message.map((item) => {
    return (
      <TextPill
        key={Math.random().toString(36).substring(2)}
        message={item.message}
        left={item.sender !== username}
      />
    );
  });
  const onchangeText = (e) => {
    setenteredMessage(e.target.value);
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      console.log(enteredMessage);
      setMessage([...message, { sender: username, message: enteredMessage }]);
      sendMessage(enteredMessage);
    }
  };
  return (
    <>
      <div className="flex flex-col m-3">
        <div className="text-center m-4 text-lg font-bold">
          Chatting with {chattingWith}
        </div>
        <div style={{ height: "90vh" }} className="flex flex-col">
          <div className="overflow-y-auto h-full">{messageView}</div>
          <div className="mb-auto"></div>
          <div className="flex border-2 rounded-lg border-black m-2 p-6">
            <input
              onKeyPress={onEnter}
              onChange={onchangeText}
              className="w-full p-4"
            />
            <button className="ml-2 p-4">send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
