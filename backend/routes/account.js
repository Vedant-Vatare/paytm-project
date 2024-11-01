const { Router } = require("express");
const router = Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const userAccount = await Account.findOne({ userId });
  if (!userAccount)
    return res.status(411).json({
      message: "Invalid account",
    });
  res.status(200).json({
    balance: userAccount.balance,
  });
});

module.exports = router;
