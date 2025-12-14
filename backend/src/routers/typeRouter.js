const { Router } = require("express");
const securityFilter = require("../filters/securityFilter");
const typeController = require("../controllers/typeController");
const typeService = require("../services/typeService");
const jobService = require("../services/jobService");

const setRouter = (app) => {
  const router = Router();

  router.get("/", typeController.getTypes);
  router.get("/:id", typeController.getType);
  router.post(
    "/",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getCreateFilter(["name"], null, [], "loại"),
    typeController.createType
  );
  router.put(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getUpdateFilter(typeService, ["id"], [], "loại"),
    typeController.updateType
  );
  router.delete(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getDeleteFilter(
      typeService,
      [{ service: jobService, label: "công việc" }],
      "typeId",
      "loại"
    ),
    typeController.deleteType
  );

  app.use("/api/type", router);
};

module.exports = { setRouter };
