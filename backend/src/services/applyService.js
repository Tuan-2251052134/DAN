const { Op } = require("sequelize");
const { Apply, CV, User } = require("../models");

const getOne = async ({ jobId, jobSeekerId, id }) => {
  const where = {};

  if (id) {
    where.id = id;
  }

  if (jobId) {
    where.jobId = jobId;
  }

  if (jobSeekerId) {
    where.jobSeekerId = jobSeekerId;
  }

  return await Apply.findOne({ where: where, raw: true });
};

const getAll = async ({ jobId, jobSeekerId }) => {
  const where = {};
  if (jobId) {
    where.jobId = jobId;
  }
  if (jobSeekerId) {
    where.jobSeekerId = jobSeekerId;
  }
  return await Apply.findAll({
    where: { jobId: jobId },
    include: [
      {
        model: CV,
        as: "cv",
      },
    ],
    raw: true,
  });
};

const getDetailOne = async ({ id }) => {
  return await Apply.findOne({
    where: {
      id: id,
    },
    raw: true,
    include: [
      {
        model: User,
        as: "jobSeeker",
        attributes: ["email", "name", "avatar"],
        include: [
          {
            model: CV,
            as: "cv",
          },
        ],
      },
    ],
  });
};

const create = async ({ apply }) => {
  return await Apply.create(apply);
};

const update = async ({ apply, id }) => {
  return await Apply.update(apply, { where: { id: id } });
};

const deleteOne = async ({ id }) => {
  return await Apply.destroy({ where: { id: id }, raw: true });
};

const checkOne = async ({ jobId, userId }) => {
  return await Apply.findOne({
    where: {
      [Op.and]: [{ jobId: jobId }, { userId: userId }],
    },
    raw: true,
  });
};

module.exports = {
  getOne,
  create,
  getAll,
  getDetailOne,
  update,
  deleteOne,
  checkOne,
};
