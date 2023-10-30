const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
},{
    versionKey:false
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
