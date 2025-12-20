const AppError = require("../configs/AppError");
const { User, District, City, CV, sequelize } = require("../models");
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
      "password",
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
      {
        model: CV,
        as: "cv",
      },
    ],
  });
};

const update = async ({ id, user }) => {
  const t = await sequelize.transaction();
  try {
    if (user.cv) {
      const cv = { id: id, url: user.cv };
      await CV.upsert(cv);
    }
    return await User.update(user, { where: { id: id }, raw: true });
  } catch (ex) {
    t.rollback();
    throw new AppError("đã có lỗi xẩy ra", 500);
  }
};

const checkCVExist = async ({ id }) => {
  return await CV.findOne({ id: id, raw: true });
};

module.exports = {
  register,
  getOne,
  getAll,
  getDetailOne,
  update,
  checkCVExist,
};
