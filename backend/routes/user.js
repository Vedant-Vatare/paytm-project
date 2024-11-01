const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {authMiddleware} = require("../middleware");
const {User, Account} = require("../db");
const userZodSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(8),
});

// credit users' account with random balance
function generateRandomBalance() {
  return Math.floor(Math.random() * 10000 + 1)
}

router.post("/signup", async (req, res) => {
  const userData = req.body;
  const zodResult = userZodSchema.safeParse(userData);
  if (!zodResult.success) {
    return res.status(411).json({ message: "Invalid Inputs", zod: zodResult });
  }
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({ message: "user already exists."});
  }

  const user = await User.create(userData);
  const jwt_token = jwt.sign({ userId: user._id }, process.env.JWT_secret);

  const accountDetails = await Account.create({
    balance: generateRandomBalance(),
    userId: user._id
  })
  res.status(200).json({
    message: "User created successfully",
    balance: accountDetails.balance,
    token: jwt_token,
  });
});


router.put("/update-user", async (req, res) => {
  const updatedData = req.body;
  const userDetails = await User.findByIdAndUpdate(req.userId ,updatedData);

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

router.put("/bulk",authMiddleware , async(req, res) => {
  const filter = req.query.filter || "";
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
