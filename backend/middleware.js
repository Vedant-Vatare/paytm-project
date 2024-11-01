const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(403).send("failed to authenticate user");
  }
  const userToken = authToken.split(" ")[1];
  try {
    const decoded = jwt.verify(userToken, process.env.JWT_secret);
    req.userId = decoded.userId
    console.log("decoded:", req.userId)
    next();
  } catch (err) {
    return res.status(403).json({});
  }
};
module.exports = authMiddleware;
