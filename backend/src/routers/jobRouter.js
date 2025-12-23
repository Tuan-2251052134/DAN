const { Router } = require("express");
const securityFilter = require("../filters/securityFilter");
const jobController = require("../controllers/jobController");
const jobService = require("../services/jobService");
const userService = require("../services/userService");
const typeService = require("../services/typeService");

const setRouter = (app) => {
  const router = Router();

  router.get(
    "/",
    securityFilter.getRolesFilter(["ANY"]),
    jobController.getJobs
  );
  router.get(
    "/:id",
    securityFilter.getRolesFilter(["ANY"]),
    jobController.getJob
  );
  router.post(
    "/",
    securityFilter.getRolesFilter(["BUSINESS", "ADMIN"]),
    securityFilter.getCreateFilter(
      ["name", "description", "payment", "userId", "typeId", "expiredDate"],
      ["BUSINESS"],
      [{ key: "typeId", service: typeService }],
      "công việc"
    ),
    jobController.createJob
  );
  router.put(
    "/:id",
    securityFilter.getRolesFilter(["BUSINESS", "ADMIN"]),
    securityFilter.getUpdateFilter(
      jobService,
      [
        "name",
        "createdDate",
        "description",
        "payment",
        "userId",
        "typeId",
        "id",
      ],
      [
        { key: "userId", service: userService },
        { key: "typeId", service: typeService },
      ],
      "công việc"
    ),
    jobController.updateJob
  );

  app.use("/api/job", router);
};

module.exports = { setRouter };
