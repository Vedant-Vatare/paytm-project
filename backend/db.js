const mongoose = require("mongoose");
const { string } = require("zod");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL);

const userShcema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  }
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const User = mongoose.model("User", userShcema);
const Account = mongoose.model("Account", accountSchema);

module.exports = { User, Account };

const a ={
  "user": User
}

// ===================
// example.js
