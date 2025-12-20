const AppError = require("../configs/AppError");
const applyService = require("../services/applyService");
const userService = require("../services/userService");
const jobService = require("../services/jobService");

const createApply = async (req, res) => {
  const apply = req.body;
  const user = req.user;

  if (user.role === "JOB_SEEKER") {
    apply.createdDate = new Date();
    apply.status = "WAIT";
    apply.jobSeekerId = user.id;
  } else {
    if (!apply.createdDate) {
      apply.createdDate = new Date();
    }
    if (!apply.status) {
      apply.status = "WAIT";
    }
  }

  const cv = userService.checkCVExist({ id: apply.userId });
  if (!cv) {
    throw new AppError("Chưa có CV", 400);
  }

  const foundApply = await applyService.checkOne({
    jobId: apply.jobId,
    jobSeekerId: apply.jobSeekerId,
  });

  if (foundApply) {
    throw new AppError("đã ứng tuyển rồi", 400);
  }

  const createdApply = await applyService.create({ apply });

  res.status(201).json({ data: createdApply, errorMessage: null });
};

const getApplys = async (req, res) => {
  const jobId = req.query.jobId;
  const user = req.user;
  const offset = req.query.offset ?? 0;

  const job = await jobService.getOne({ id: jobId });
  if (!job) {
    throw new AppError("Không tồn tại công việc này", 400);
  }

  if (job.userId != user.id && user.role == "BUSINESS") {
    throw new AppError("Không được xem danh sách công việc này", 403);
  }

  const applys = await applyService.getAll({
    jobId,
    jobSeekerId: user.role === "JOB_SEEKER" && user.id,
    offset,
  });
  res.status(200).json({ data: applys, errorMessage: null });
};

const getApply = async (req, res) => {
  const id = req.params.id;

  const apply = await applyService.getDetailOne({ id });

  res.status(200).json({ data: apply, errorMessage: null });
};

const updateApply = async (req, res) => {
  const id = req.params.id;
  const apply = req.body;

  if (apply.status != "PASS" && apply.status != "FAIL") {
    apply.status = "WAIT";
  }

  const updatedApply = await applyService.update({ apply, id });

  res.status(201).json({ data: updatedApply, errorMessage: null });
};

const deleteApply = async (req, res) => {
  const id = req.params.id;

  const apply = applyService.getOne({ id });
  if (apply.status == "WAIT") {
    throw new AppError(
      "Không được phép gỡ apply cho công việc đã được nhà tuyển dụng chấp nhận",
      400
    );
  }

  await applyService.deleteOne({ id });
  res.status(204).json();
};
module.exports = { createApply, getApplys, getApply, updateApply, deleteApply };
