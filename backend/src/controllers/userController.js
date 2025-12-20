const userSerivce = require("../services/userService");
const securityUtil = require("../utils/securityUtil");
const uploadFileUtil = require("../utils/uploadFileUtil");
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
  const id = req.user.id;
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

const updateUserProfile = async (req, res) => {
  const files = req.files;
  const body = req.body;
  const user = req.user;

  if (files.cv?.[0]) {
    body.cv = await uploadFileUtil.uploadFile(files.cv[0].buffer);
  }
  if (files.avatar?.[0]) {
    body.avatar = await uploadFileUtil.uploadFile(files.avatar[0].buffer);
  }

  const updatedUser = await userSerivce.update({ user: body, id: user.id });

  res.json({ data: updatedUser, errorMessage: null });
};

const getUserProfile = async (req, res) => {
  const id = req.user.id;
  const detailData = await userSerivce.getDetailOne({ id });
  res.json({ data: detailData, errorMessage: null });
};


module.exports = {
  login,
  register,
  getUsers,
  getUser,
  updateUser,
  updateUserProfile,
  getUserProfile,
};
