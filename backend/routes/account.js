const { Router } = require("express");
const router = Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");

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

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, toAccount } = req.body;
  const account = Account.findOne({ userId: req.userId }).session(session);
  console.log(account)
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balace" });
  }
  const toAccountResult = await Account.findOne({ userId: toAccount }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
        message: "Invalid account"
    });
  }

  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: toAccount }, { $inc: { balance: amount } }).session(session);

  await session.commitTransaction();
  res.json({
      message: "Transfer successful"
  });
  session.endSession();
});

module.exports = router;
