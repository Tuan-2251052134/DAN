const { Op } = require("sequelize");
const { Job, Type, User, Message, sequelize } = require("../models");
const { raw } = require("mysql2");
const AppError = require("../configs/AppError");

const getOne = async ({ id, typeId }) => {
  const where = {};
  if (typeId) {
    where.typeId = typeId;
  }

  if (id) {
    where.id = id;
  }

  const job = await Job.findOne({
    where: where,
    include: [
      {
        model: Type,
        as: "type",
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "avatar"],
      },
      {
        model: Message,
        as: "message",
      },
    ],
    raw: true,
  });

  return job;
};

const create = async ({ job, message }) => {
  const t = await sequelize.transaction();
  try {
    const createdJob = await Job.create(job, { raw: true });
    if (message) {
      message.id = createdJob.id;
      await Message.create(message, { raw: true });
    }
    t.commit();
    return createdJob;
  } catch (ex) {
    t.rollback();
    throw new AppError(ex.message, 500);
  }
};

const getAll = async ({ name, typeId, offset, userId, status }) => {
  const where = {};

  if (name) {
    where.name = { [Op.like]: `%${name}%` };
  }

  if (typeId) {
    where.typeId = typeId;
  }

  if (userId) {
    where.userId = userId;
  }

  if (status) {
    where.status = status;
  }

  where.expiredDate > new Date();

  return await Job.findAll({
    include: [
      {
        model: Type,
        as: "type",
      },
    ],
    where: where,
    limit: parseInt(process.env.QUERY_LIMIT),
    offset: offset * parseInt(process.env.QUERY_LIMIT),
    raw: true,
  });
};

const update = async ({ id, job, message }) => {
  const t = await sequelize.transaction();
  try {
    const updatedJob = await Job.update(job, { where: { id: id }, raw: true });
    const foundMessage = await Message.findOne({ where: { id: id } });
    if (foundMessage) {
      await Message.update(message, { where: { id: id }, raw: true });
    } else {
      await Message.create(message, { raw: true });
    }
    t.commit();
    return updatedJob;
  } catch (ex) {
    t.rollback();
    throw new AppError(ex.message, 500);
  }
};

const deleteOne = async ({ id }) => {
  const t = await sequelize.transaction();
  try {
    await Message.destroy({ where: { id: id } });
    await Job.destroy({ where: { id: id } });
    t.commit();
  } catch (ex) {
    t.rollback();
    throw new AppError(ex.message, 500);
  }
};

module.exports = { getOne, create, getAll, update, deleteOne };
