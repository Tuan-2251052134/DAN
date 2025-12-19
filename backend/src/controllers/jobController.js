const AppError = require("../configs/AppError");
const jobService = require("../services/jobService");
const applyService = require("../services/applyService");

const createJob = async (req, res) => {
  const user = req.user;
  const job = req.body;

  const message = job["message.value"] && {
    value: job["message.value"],
  };

  if (job.expriredDate < new Date()) {
    throw new AppError("Kông thể set thời gian trc thời gian hiện tại", 400);
  }

  if (user.role === "BUSINESS") {
    job.createdDate = new Date();
    job.status = "WAIT";
  } else {
    if (!job.createdDate) {
      job.createdDate = new Date();
    }
    if (!job.status) {
      job.status = "WAIT";
    }
  }

  const createdJob = await jobService.create({ job, message });

  res.status(200).json({ data: createdJob, errorMessage: null });
};

const getJobs = async (req, res) => {
  const name = req.query.name;
  const typeId = req.query.typeId;
  const offset = req.query.offset ?? 0;
  const userId = req.query.jobId;
  let status;
  const user = req.user;

  if (!user || user.role == "JOBSEEKER") {
    status = "PASS";
  }


  if ((userId && user.id != userId) && user.role !== "ADMIN") {
    throw new AppError("Bạn không có quyền xem", 401);
  }

  const jobs = await jobService.getAll({
    name,
    typeId,
    offset,
    userId,
    status,
  });
  res.status(200).json({ data: jobs, errorMessage: null });
};

const getJob = async (req, res) => {
  const id = req.params.id;
  const user = req.user;

  const job = await jobService.getOne({ id, status: "PASS" });
  if (job.status !== "PASS" && job.userId != user?.id && user.role != "ADMIN") {
    throw new AppError("Không thể xem chi tiết công việc này", 403);
  }
  res.status(200).json({ data: job, errorMessage: null });
};

const updateJob = async (req, res) => {
  const id = req.params.id;
  const job = req.body;
  const user = req.user;

  const message = job["message.value"] && {
    id: job.id,
    value: job["message.value"],
  };

  if (job.status !== "WAIT" && user.role !== "ADMIN") {
    throw new AppError("không thể thay đối trạng thái khác ngoài Đợi", 400);
  }

  if (job.expriredDate < new Date()) {
    throw new AppError("Kông thể set thời gian trc thời gian hiện tại", 400);
  }

  const createdJob = await jobService.update({ id, job, message });

  res.status(200).json({ data: createdJob, errorMessage: null });
};

module.exports = { createJob, getJobs, getJob, updateJob };
