const Chat = require("../models/Chat");
const User = require("../models/User");

//returns true if id succefully created else false
const signup = (req, res) => {
  var user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });
  user.save((err) => {
    if (err) {
      console.log(err);
      res.send(false);
      return;
    }
    res.send(true);
  });
};
const involved = (req, res) => {
  User.find({ username: req.body.username }, (err, doc) => {
    const user = doc[0];
    console.log(user);
    if (err) {
      res.send(false);
    } else {
      console.log(user.involved);
      res.send(user.involved);
    }
  });
};
const search = (req, res) => {
  User.find({ username: req.body.username }, (err, user) => {
    console.log(user);
    if (err) {
      res.send(false);
    } else {
      console.log(user);
      res.send(user);
    }
  });
};
const getChats = (req, res) => {
  Chat.find({ chatID: req.body.chatID }, (err, chat) => {
    //console.log(user);
    if (err) {
      res.send(false);
    } else {
      //console.log(user);
      console.log(chat);
      if (chat[0]) {
        res.send(chat[0].messages);
      } else {
        res.send([]);
      }
    }
  });
};
const login = (req, res) => {
  var loginUser = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log(loginUser);
  try {
    if (loginUser.password !== null && loginUser.username !== null) {
      User.findOne({ username: loginUser.username }, (err, user) => {
        console.log(user);
        if (err || user === null) {
          res.send(false);
        } else {
          user.comparePassword(loginUser.password, function (err, isMatch) {
            if (err) throw err;
            if (isMatch)
              console.log("[EXP] %s has logged in", loginUser.username);
            res.send(isMatch);
          });
        }
      });
    } else {
      res.send(false);
    }
  } catch (err) {
    res.send(false);
  }
};

exports.signup = signup;
exports.login = login;
exports.involved = involved;
exports.search = search;
exports.getChats = getChats;
