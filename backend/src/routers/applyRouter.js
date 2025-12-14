const { Router } = require("express");
const securityFilter = require("../filters/securityFilter");
const applyController = require("../controllers/applyController");
const applyService = require("../services/applyService");
const cvService = require("../services/cvService");
const jobService = require("../services/jobService");

const setRouter = (app) => {
  const router = Router();
  router.post(
    "/",
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    securityFilter.getCreateFilter(
      ["cvId", "jobId"],
      ["JOB_SEEKER"],
      [
        { key: "cvId", service: cvService, label: "cv" },
        { key: "jobId", service: jobService, label: "công việc" },
      ]
    ),
    applyController.createApply
  );
  router.get(
    "/",
    securityFilter.getRolesFilter(["ADMIN", "BUSINESS"]),
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
      ["createdDate", "cvId", "id", "jobId"],
      [],
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
