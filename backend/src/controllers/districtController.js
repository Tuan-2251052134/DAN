const districtService = require("../services/districtService");

const getDistrict = async (req, res) => {
  const id = req.params.id;

  const district = await districtService.getOne({ id });
  res.status(200).json({ data: district, errorMessage: null });
};

const getDistricts = async (req, res) => {
  const name = req.query.name;
  const offset = req.query.offset ?? 0;
  const cityId = req.query.cityId;

  const districts = await districtService.getAll({ name, offset, cityId });
  res.status(200).json({ data: districts, errorMessage: null });
};

const createDistrict = async (req, res) => {
  const district = req.body;

  const newDistrict = await districtService.create({ district });
  res.status(201).json({ data: newDistrict, errorMessage: null });
};

const updateDistrict = async (req, res) => {
  const id = req.params.id;
  const district = req.body;

  const updateDistrict = await districtService.update({ district, id: id });
  res.status(200).json({ data: updateDistrict, errorMessage: null });
};

const deleteDistrict = async (req, res) => {
  const id = req.params.id;
  await districtService.deleteOne({ id });
  res.status(200).json();
};

module.exports = {
  getDistrict,
  getDistricts,
  createDistrict,
  deleteDistrict,
  updateDistrict,
};
