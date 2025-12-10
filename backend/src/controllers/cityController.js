const cityService = require("../services/cityService");

const getCities = async (req, res) => {
  const name = req.query.name;
  const offset = req.query.offset ?? 0;

  const cities = await cityService.getAll({ name, offset });
  res.status(200).json({ data: cities, errorMessage: null });
};

const createCity = async (req, res) => {
  const city = req.body;

  const newCity = await cityService.create({ city });
  res.status(201).json({ data: newCity, errorMessage: null });
};

const getCity = async (req, res) => {
  const id = req.params.id;
  const city = await cityService.getOne({ id });

  res.status(200).json({ data: city, errorMessage: null });
};

const updateCity = async (req, res) => {
  const id = req.params.id;
  const city = req.body;

  const newCity = await cityService.update({ city, id });
  res.status(200).json(newCity);
};

const deleteCity = async (req, res) => {
  const id = req.params.id;

  await cityService.deleteOne({ id });

  res.status(204).json();
};

module.exports = { getCities, createCity, getCity, updateCity, deleteCity };
