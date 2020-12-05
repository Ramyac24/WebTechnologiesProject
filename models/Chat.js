const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ChatSchema = new Schema(
  {
    chatID: String,
    participants: [String],
    messages: [{ sender: String, message: String }],
  },
  {
    collection: "Chats",
  }
);

module.exports = mongoose.model("Chat", ChatSchema);
