const { Router } = require("express");
const securityFilter = require("../filters/securityFilter");
const applyController = require("../controllers/applyController");
const applyService = require("../services/applyService");
const userService = require("../services/userService");
const jobService = require("../services/jobService");

const setRouter = (app) => {
  const router = Router();
  router.post(
    "/",
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    securityFilter.getCreateFilter(
      ["userId", "jobId"],
      ["JOB_SEEKER"],
      [
        { key: "userId", service: userService, label: "người dùng" },
        { key: "jobId", service: jobService, label: "công việc" },
      ],
      "ứng tuyển cho người khác"
    ),
    applyController.createApply
  );
  router.get(
    "/",
    securityFilter.getRolesFilter(["ADMIN", "BUSINESS", "JOB_SEEKER"]),
    applyController.getApplys
  );
  router.get(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN", "BUSINESS"]),
    applyController.getApply
  );
  router.put(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN", "BUSINESS"]),
    securityFilter.getUpdateFilter(
      applyService,
      ["createdDate", "jobSeekerId", "id", "jobId"],
      [
        {
          key: "jobSeekerId",
          service: userService,
        },
        {
          key: "jobId",
          service: jobService,
        },
      ],
      "cuộc ứng tuyển"
    ),
    applyController.updateApply
  );
  router.delete(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    securityFilter.getDeleteFilter(applyService, [], null, "cuộc ứng tuyển"),
    applyController.deleteApply
  );

  app.use("/api/apply", router);
};

module.exports = { setRouter };
