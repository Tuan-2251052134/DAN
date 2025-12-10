const { raw } = require("mysql2");
const { User, District, Job } = require("../models");
const { Op } = require("sequelize");

const register = async ({ user }) => {
  return await User.create(user);
};

const getOne = async ({ email, id }) => {
  const where = {};
  if (email) {
    where.email = email;
  }
  if (id) {
    where.id = id;
  }
  return await User.findOne({ where: where, raw: true });
};

const getAll = async ({ name, offset }) => {
  const where = {};
  if (name) {
    where.keyword = { [Op.like]: `%${keyword}%` };
  }
  return await User.findAll({
    where: where,
    raw: true,
    attributes: [
      "id",
      "districtId",
      "address",
      "role",
      "name",
      "email",
      "avatar",
    ],
    limit: parseInt(process.env.QUERY_LIMIT),
    offset: parseInt(offset) * parseInt(process.env.QUERY_LIMIT),
  });
};

const getUserProfile = async ({ id }) => {
  return await User.findOne({
    where: { id: id },
    include: [
      {
        model: District,
      },
      {
        model: Job,
        limit,
      },
    ],
    raw: true,
  });
};

module.exports = { register, getOne, getAll };
