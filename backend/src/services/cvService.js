const { Op, where } = require("sequelize");
const { CV, Apply, Job, User } = require("../models");
const { raw } = require("mysql2");

const getAll = async ({ name, offset, userId }) => {
  const where = {};
  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }
  if (userId) {
    where.userId = userId;
  }

  return await CV.findAll({
    where: where,
    offset: parseInt(offset) * parseInt(offset),
    limit: parseInt(process.env.QUERY_LIMIT),
    raw: true,
  });
};

const create = async ({ cv }) => {
  return await CV.create(cv);
};

const getOne = async ({ id }) => {
  return await CV.findOne({
    where: { id: id },
    raw: true,
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name"],
      },
    ],
  });
};

const getDetailOne = async ({ id }) => {
  return await CV.findOne({
    where: { id: id },
    include: [
      {
        model: Apply,
        as: "applys",
        include: [
          {
            model: Job,
            as: "job",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });
};

const update = async ({ id, cv }) => {
  return await CV.update(cv, { where: { id: id } });
};

const deleteOne = async ({ id }) => {
  return await CV.destroy({ where: { id: id }, raw: true });
};
module.exports = { getAll, create, getOne, update, deleteOne, getDetailOne };
