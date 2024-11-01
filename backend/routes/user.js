const { Router, application } = require("express");
const router = Router();
const UsersDB = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {authMiddleware} = require("../middleware");
const {User} = require("../db");
const userZodSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(8),
});

router.post("/signup", async (req, res) => {
  const userData = req.body;
  const zodResult = userZodSchema.safeParse(userData);
  if (!zodResult.success) {
    return res.status(411).json({ message: "Invalid Inputs", zod: zodResult });
  }
  const userFound = await UsersDB.findOne({ username: req.body.username });
  if (userFound) {
    return res.status(411).json({ message: "user already exists." });
  }

  const user = await UsersDB.create(userData);
  const jwt_token = jwt.sign({ userId: user._id }, process.env.JWT_secret);
  res.status(200).json({
    message: "User created successfully",
    token: jwt_token,
  });
});

router.put("/update-user", authMiddleware, async (req, res) => {
  const updatedData = req.body;
  // console.log(req.userId);
  const userDetails = await User.findByIdAndUpdate(
    { _id: req.userId },
    updatedData
  );

  console.log("userDetails:", userDetails);
  if (!userDetails) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
  res.status(200).json({
    message: "Updated successfully",
  });
});

router.put("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter ?? "";
  const users = await User.find({
    $or: [
      { firstName: { $regex: filter } },
      { lastName: { $regex: filter } }
    ],
  });
  console.log(filter, users);
  res.status(200).json(
    users.map(({ username, firstName, lastName }) => {
      return { username, firstName, lastName };
    })
  );
});

module.exports = router;
