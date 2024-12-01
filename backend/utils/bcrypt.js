const bcrypt = require("bcrypt");

const createHash = async (value) => {
  const saltRound = 12;
  const hash = await bcrypt.hash(value, saltRound);
  return hash;
};

const compareWithHash = async (value, hash) => {
  const result = bcrypt.compare(value, hash);
  return result;
};

module.exports = { createHash, compareWithHash };
