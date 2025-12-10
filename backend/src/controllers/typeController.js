const AppError = require("../configs/AppError");
const typeService = require("../services/typeService");
const jobService = require("../services/jobService");
const checkUtil = require("../utils/checkUtil");

const checkTypeExist = async (id) => {
  const type = await typeService.getOne({ id });
  if (!type) {
    throw new AppError("Không tìm thấy loại công việc này", 400);
  }
  return type;
};
const getTypes = async (req, res) => {
  const name = req.query.name;
  const offset = req.query.offset ?? 0;

  const types = await typeService.getAll({ name, offset });
  res.status(200).json({ data: types, errorMessage: null });
};

const createType = async (req, res) => {
  const type = req.body;
  checkUtil.checkNullField(type, ["name"]);

  const createdType = await typeService.create({ type });
  res.status(201).json({ data: createdType, errorMessage: null });
};

const getType = async (req, res) => {
  const id = req.params.id;

  const type = await typeService.getOne({ id });
  res.status(200).json({ data: type, errorMessage: null });
};

const updateType = async (req, res) => {
  const id = req.params.id;
  const type = req.body;

  checkUtil.checkNullField(type, ["name"]);
  const foundType = await checkTypeExist(id);
  checkUtil.checkChangeField(type, foundType, ["id"]);

  const updateType = await typeService.update({ type, id });
  res.status(200).json({ data: updateType, errorMessage: null });
};

const deleteType = async (req, res) => {
  const id = req.params.id;

  await typeService.deleteOne({ id });

  res.status(204).json();
};
module.exports = { getTypes, createType, getType, updateType, deleteType };
