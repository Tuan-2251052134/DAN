const { Apply, CV, User } = require("../models");

const getOne = async ({ jobId, cvId, id }) => {
  const where = {};

  if (id) {
    where.id = id;
  }

  if (jobId) {
    where.jobId = jobId;
  }

  if (cvId) {
    where.cvId = cvId;
  }

  return await Apply.findOne({ where: where, raw: true });
};

const getAll = async ({ jobId }) => {
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
        model: CV,
        as: "cv",
        include: [
          {
            model: User,
            as: "user",
            attributes: ["email", "name", "avatar"],
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

module.exports = { getOne, create, getAll, getDetailOne, update, deleteOne };
