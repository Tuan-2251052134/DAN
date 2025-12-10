const userSerivce = require("../services/userService");
const districtService = require("../services/districtService");
const securityUtil = require("../utils/securityUtil");
const uploadFileUtil = require("../utils/uploadFileUtil");
const checkUtil = require("../utils/checkUtil");
const AppError = require("../configs/AppError");

const login = async (req, res) => {
  const user = req.body;

  if (!user) {
    throw new AppError(`Không truyền body`, 400);
  }

  let errorMessage = "";
  !user.email && (errorMessage += "email, ");
  !user.password && (errorMessage += "mật khẩu, ");

  if (errorMessage) {
    throw new AppError(`Thiếu các trường: ${errorMessage}`, 400);
  }

  const foundUser = await userSerivce.getOne({ email: user.email });

  if (!foundUser) {
    throw new AppError("Email hoặc mật khẩu không đúng", 400);
  }

  const passwordCheck = await securityUtil.checkPassword(
    user.password,
    foundUser.password
  );

  if (!passwordCheck) {
    throw new AppError("Email hoặc mật khẩu không đúng", 400);
  }

  if (user.role == "ADMIN" && foundUser.role != "ADMIN") {
    throw new AppError("Không có quyền login vào admin", 403);
  }

  delete foundUser.password;
  const token = securityUtil.encodeJwt(foundUser);
  foundUser.token = token;

  res.status(200).json({ data: foundUser, errorMessage: null });
};

const register = async (req, res) => {
  const user = req.body;

  req.file ?? (errorMessage += "avatar");

  checkUtil.checkNullField(user, [
    "email",
    "password",
    "districtId",
    "role",
    "name",
  ]);

  if (user.role === "ADMIN") {
    throw new AppError("lỗi dữ liệu không thể đăng ký với vai trò admin", 400);
  }

  const district = districtService.getOne({ id: user.districtId });
  if (!district) {
    throw new AppError("không có quận này", 400);
  }

  const foundUser = await userSerivce.getOne({ email: user.email });
  if (foundUser) {
    throw new AppError("Email đã tồn tại", 400);
  }

  user.password = await securityUtil.hashPassword(user.password);
  user.avatar = await uploadFileUtil.uploadFile(req.file.buffer);
  const newUser = await userSerivce.register(user);

  res.status(200).json({ data: newUser, errorMessage: null });
};

const getUsers = async (req, res) => {
  const name = req.params.name;
  const offset = req.query.offset ?? 0;

  const users = await userSerivce.getAll({ name, offset });
  res.status(200).json({ data: users, errorMessage: null });
};

const getUserProfile = async (req, res) => {};

module.exports = { login, register, getUsers };
