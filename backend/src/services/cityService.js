const { Op } = require("sequelize");
const { City } = require("../models");

const getAll = async ({ name, offset }) => {
  const where = {};
  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }
  return await City.findAll({
    where: where,
    offset: parseInt(offset) * parseInt(process.env.QUERY_LIMIT),
    limit: parseInt(process.env.QUERY_LIMIT),
    raw: true,
  });
};

const create = async ({ city }) => {
  return await City.create(city);
};

const getOne = async ({ id }) => {
  return await City.findOne({ where: { id: id }, raw: true });
};

const update = async ({ city, id }) => {
  return await City.update(city, { where: { id: id } });
};

const deleteOne = async ({ id }) => {
  return await City.destroy({ where: { id: id } });
};

module.exports = { getAll, create, getOne, update, deleteOne };
