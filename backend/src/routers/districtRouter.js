const { Router } = require("express");
const districtController = require("../controllers/districtController");
const securityFilter = require("../filters/securityFilter");
const districtService = require("../services/districtService");
const cityService = require("../services/cityService");
const userService = require("../services/userService");

const setRouter = (app) => {
  const router = Router();

  router.get("/", districtController.getDistricts);
  router.get("/:id", districtController.getDistrict);
  router.post(
    "/",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getCreateFilter(
      ["name", "cityId"],
      null,
      [{ key: "cityId", service: cityService }],
      "quận"
    ),
    districtController.createDistrict
  );
  router.put(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getUpdateFilter(
      districtService,
      ["id"],
      [{ key: "cityId", service: cityService }],
      "quận"
    ),
    districtController.updateDistrict
  );
  router.delete(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getDeleteFilter(
      districtService,
      [{ service: userService, label: "người dùng" }],
      "districtId",
      "quận"
    ),
    districtController.deleteDistrict
  );

  app.use("/api/district", router);
};

module.exports = { setRouter };
