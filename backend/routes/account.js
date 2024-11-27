const { Router } = require("express");
const router = Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const mongoose = require("mongoose");
const zod = require("zod");

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

const amountValidation = zod.object({
  amount: zod.number().positive(),
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  const { amount, toAccount } = req.body;
  const zodResult = amountValidation.safeParse({ amount });
  if (!zodResult.success) {
    return res.status(411).json({ message: "Invalid Amount." });
  }
  session.startTransaction();
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balace" });
  }
  const toAccountResult = await Account.findOne({ userId: toAccount }).session(
    session
  );

  if (!toAccountResult) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: toAccount },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    message: "Transfer successful",
  });
  session.endSession();
});

async function createUPIIds() {
  await Account.updateMany({}, {upiId: null}) 
}
createUPIIds()
module.exports = router;