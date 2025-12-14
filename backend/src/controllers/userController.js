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
  console.log(foundUser)

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

  const foundUser = await userSerivce.getOne({ email: user.email });
  if (foundUser) {
    throw new AppError("Email đã tồn tại", 400);
  }

  user.password = await securityUtil.hashPassword(user.password);
  user.avatar = await uploadFileUtil.uploadFile(req.file.buffer);
  const newUser = await userSerivce.register({ user });

  res.status(200).json({ data: newUser, errorMessage: null });
};

const getUsers = async (req, res) => {
  const name = req.params.name;
  const offset = req.query.offset ?? 0;

  const users = await userSerivce.getAll({ name, offset });
  res.status(200).json({ data: users, errorMessage: null });
};

const getUser = async (req, res) => {
  const id = req.params.id;
  const currentUser = req.user;

  if (!currentUser) {
    throw new AppError("Chưa xác thực quyền", 401);
  }

  const user = await userSerivce.getDetailOne({ id });

  if (currentUser.role !== "ADMIN" && currentUser.id != user.id) {
    throw new AppError("Không có quyền để truy cập", 403);
  }

  res.status(200).json({ data: user, errorMessage: null });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  const updatedUser = await userSerivce.update({ id, user });

  res.status(200).json({ data: updatedUser, errorMessage: null });
};

module.exports = { login, register, getUsers, getUser, updateUser };
