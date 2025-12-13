const cvSerivce = require("../services/cvService");
const uploadFileUtil = require("../utils/uploadFileUtil");

const getCVs = async (req, res) => {
  const name = req.query.name;
  const offset = req.query.offset ?? 0;
  const user = req.user;

  let userId = user.role === "ADMIN" ? req.query.userId : user.id;
  
  const cvs = await cvSerivce.getAll({ name, offset, userId });
  res.status(200).json({ data: cvs, errorMessage: null });
};

const createCV = async (req, res) => {
  const cv = req.body;
  const url = await uploadFileUtil.uploadFile(cv.file.buffer);
  cv.url = url;
  delete cv.file;

  cvSerivce.create({ cv });

  res.status(200).json({ data: cv, errorMessage: null });
};

const getCV = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  let data = req.obj;
  if (user.role == "JOB_SEEKER") {
    data = await cvSerivce.getDetailOne({ id });
  }
  res.status(200).json({ data: data, errorMessage: null });
};

const updateCV = async (req, res) => {
  const id = req.params.id;
  const cv = req.body;

  if (cv.file) {
    const url = await uploadFileUtil.uploadFile(cv.file.buffer);
    cv.url = url;
    delete cv.file;
  }

  const updatedCV = await cvSerivce.update({ cv, id });
  res.status(200).json({ data: updatedCV, errorMessage: null });
};

const deleteCV = async (req, res) => {
  const id = req.params.id;

  await cvSerivce.deleteOne({ id });
  res.status(204).json();
};

module.exports = { getCVs, createCV, getCV, updateCV, deleteCV };
