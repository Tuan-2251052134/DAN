const { Op } = require("sequelize");
const { Type } = require("../models");

const getAll = async ({ name, offset }) => {
  const where = {};

  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }

  return await Type.findAll({
    where: where,
    offset: parseInt(offset) * parseInt(process.env.QUERY_LIMIT),
    limit: parseInt(process.env.QUERY_LIMIT),
    raw: true,
  });
};

const getOne = async ({ id }) => {
  const where = {};

  if (id) {
    where.id = id;
  }

  return await Type.findOne({
    where: where,
  });
};

const create = async ({ type }) => {
  return await Type.create(type);
};

const update = async ({ type, id }) => {
  const updatedType = await Type.update(type, { where: { id: id }, raw: true });
  return updatedType;
};

const deleteOne = async ({ id }) => {
  await Type.destroy({ where: { id: id } });
};

module.exports = { getAll, create, getOne, update, deleteOne };
