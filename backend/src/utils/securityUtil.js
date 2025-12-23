const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../configs/AppError");

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const checkPassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

const encodeJwt = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
};

const decodeJwt = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    throw new AppError("Token sai hoặc hết hạn", 403);
  }
};

module.exports = { hashPassword, checkPassword, decodeJwt, encodeJwt };
