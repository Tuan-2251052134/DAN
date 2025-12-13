const { Router } = require("express");
const securityFilter = require("../filters/securityFilter");
const cvController = require("../controllers/cvController");
const multerFilter = require("../filters/multerFilter");
const cvSerivce = require("../services/cvService");
const applyService = require("../services/applyService");
const userSerivce = require("../services/userService");

const setRouter = (app) => {
  const router = Router();
  router.get(
    "/",
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    cvController.getCVs
  );
  router.get(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    securityFilter.getRetriveFilter(cvSerivce),
    cvController.getCV
  );
  router.post(
    "/",
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    multerFilter.single("cvFile"),
    securityFilter.getCreateFilter(
      ["name", "userId", "file"],
      ["JOB_SEEKER"],
      []
    ),
    cvController.createCV
  );
  router.put(
    "/:id",
    multerFilter.single("cvFile"),
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    securityFilter.getUpdateFilter(cvSerivce, ["id", "userId"], {
      key: "userId",
      service: userSerivce,
    }),
    cvController.updateCV
  );
  router.delete(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN", "JOB_SEEKER"]),
    securityFilter.getDeleteFilter(cvSerivce, [applyService], "cvId"),
    cvController.deleteCV
  );

  app.use("/api/cv", router);
};

module.exports = { setRouter };
