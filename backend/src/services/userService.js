const { raw } = require("mysql2");
const { User, District, City } = require("../models");
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
  return await User.findOne({
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
  });
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

const getDetailOne = async ({ id }) => {
  const where = {};
  if (id) {
    where.id = id;
  }
  return await User.findOne({
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
    include: [
      {
        model: District,
        as: "district",
        include: [
          {
            model: City,
            as: "city",
          },
        ],
      },
    ],
  });
};

const update = async ({ id, user }) => {
  return await User.update(user, { where: { id: id }, raw: true });
};
module.exports = { register, getOne, getAll, getDetailOne, update };
