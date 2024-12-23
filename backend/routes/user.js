const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const zod = require("zod");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware");
const { User, Account } = require("../db");
const { sendEmailToUser } = require("../utils/sendMail");
const { createHash, compareWithHash } = require("../utils/bcrypt");


const userZodSchema = zod.object({
  email: zod.string().email().toLowerCase(),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(8),
});

// credit user account with random balance
function generateRandomBalance() {
  return Math.floor(Math.random() * 10000 + 1);
}

router.post("/signup", async (req, res) => {
  const userData = req.body;
  const zodResult = userZodSchema.safeParse(userData);
  if (!zodResult.success) {
    return res
      .status(411)
      .json({ message: "Invalid Inputs", "Validation Error:": zodResult });
  }
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(411).json({ message: "user already exists." });
  }

  userData.password = await createHash(userData.password)
  const user = await User.create(userData);
  console.log(userData)
  const jwt_token = jwt.sign({ userId: user._id }, process.env.JWT_secret);

  const accountDetails = await Account.create({
    balance: generateRandomBalance(),
    userId: user._id,
  });
  res.status(200).json({
    message: "User created successfully",
    balance: accountDetails.balance,
    token: jwt_token,
  });
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ message: "email does not exists" });

    const isPasswordCorrect = await compareWithHash(req.body.password, user.password)
    if(!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });

    const jwt_token = jwt.sign({ userId: user._id }, process.env.JWT_secret);
    res.status(200).json({
      message: "User signin succesfull",
      token: jwt_token,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ Error: e });
  }
});

function generateToken(email) {
  return jwt.sign({ email }, process.env.JWT_secret, { expiresIn: "1h" });
}

router.post("/forgot-password", async (req, res) => {
  try {
    const email = req.body.email;
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      const token = generateToken(email);
      await sendEmailToUser(email, token);
      return res.status(200).json({ message: "user exists sent email" });
    } else {
      return res.status(400).json({ message: "user does not exists" });
    }
  } catch (e) {
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  const token = req.query.token;
  const password = req.body.password;
  try {
    const decoded = jwt.verify(token, process.env.JWT_secret);
    if (decoded) {
      const hashedPassword = await createHash(password);
      const user = await User.updateOne(
        { email: decoded.email },
        { password: hashedPassword }
      );
      const newToken = jwt.sign({ email: user.email }, process.env.JWT_secret);
      return res.status(200).json({
        message: "password reset successful",
        token: newToken,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error or invalid token" });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const { email, firstName, lastName } = await User.findById(req.userId);
    res.status(200).json({ user: { email, firstName, lastName } });
  } catch (e) {
    res.status(500).json({ message: "Could not get the user.", e });
  }
});

router.get("/recipient", authMiddleware, async (req, res) => {
  try {
    const recipientId = req.query.id;
    console.group(recipientId);
    const recipient = await User.findById(recipientId);
    if (recipient)
      return res.status(200).json({
        user: {
          firstName: recipient.firstName,
          lastName: recipient.lastName,
        },
      });
    else {
      return res.status(400).json({ message: "User does not exists" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Error while getting user." });
  }
});

router.put("/update-user", authMiddleware, async (req, res) => {
  const updatedData = req.body;
  try {
    const userDetails = await User.findByIdAndUpdate(req.userId, updatedData);
    res.status(200).json({
      message: "Updated successfully",
    });
  } catch (err) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  try {
    const matchedUsers = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
      _id: { $ne: new mongoose.Types.ObjectId(req.userId) },
    }).sort({ firstName: 1 });
    res.status(200).json({
      users: matchedUsers.map(({ email, firstName, lastName, _id }) => {
        return { email, firstName, lastName, _id };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", id: req.userId });
  }
});

module.exports = router;
