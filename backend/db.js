const mongoose = require("mongoose")
const { string } = require("zod")
require("dotenv").config()
mongoose.connect(process.env.MONGODB_URL)

const userShcema = new mongoose.Schema({
  username:{ 
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  balance: Number
})

const User = mongoose.model("User", userShcema)

module.exports = User;