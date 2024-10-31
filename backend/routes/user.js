const { Router } = require("express")
const router = Router()
const UsersDB = require("../db")
const jwt = require("jsonwebtoken")
const jwt_secret = require("../config")
const zod = require("zod")
const userZodSchema = zod.object({
  username: zod.string().min(6),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),  
  password: zod.string()
})

router.post("/signup", async (req, res)=> {
  const userData = req.body;
  const zodResult = userZodSchema.safeParse(userData);

  if(!zodResult.success) {
    return res.status(411).json({message:"Invalid Inputs", zod: zodResult})
  } 

  const userFound = await UsersDB.findOne(userData)
  if (userFound) {
    return res.status(411).json({message: "user already exists."})
  }

  const jwt_token = jwt.sign(userData, jwt_secret)
  await UsersDB.create(userData);
  res.status(200).json({
    message: "User created successfully",
    token: jwt_token
  })
});

module.exports = router;