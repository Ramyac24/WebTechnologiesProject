const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema(
  {
    name: String, // String is shorthand for {type: String}
    online: { type: Boolean, default: true },
    username: { type: String, required: true, index: { unique: true } },
    involved: [{ chatID: String, person: String }],
    password: { type: String, required: true },
  },
  {
    collection: "Users",
  }
);

UserSchema.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Check if the password matches the hash  -- Login Functionality
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
