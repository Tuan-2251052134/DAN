const { Op, where } = require("sequelize");
const { District, City } = require("../models");

const getOne = ({ id, cityId }) => {
  const where = {};
  
  if (id) {
    where.id = id;
  }

  if (cityId) {
    where.cityId = cityId;
  }

  return District.findOne({
    where: where,
    raw: true,
    include: [{ model: City, as: "city" }],
  });
};

const getAll = ({ name, offset, cityId }) => {
  const where = {};

  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }

  if (cityId) {
    where.cityId = cityId;
  }

  return District.findAll({
    where: where,
    offset: parseInt(offset) * parseInt(process.env.QUERY_LIMIT),
    limit: parseInt(process.env.QUERY_LIMIT),
    raw: true,
  });
};

const create = async ({ district }) => {
  return await District.create(district);
};

const update = async ({ district, id }) => {
  return await District.update(district, { where: { id: id } });
};

const deleteOne = async ({ id }) => {
  return await District.destroy({ where: { id: id } });
};

module.exports = { getOne, getAll, create, update, deleteOne };
