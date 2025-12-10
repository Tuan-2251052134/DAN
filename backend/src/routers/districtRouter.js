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
    securityFilter.getCreateFilter(["name", "cityId"], null, [
      { key: "cityId", service: cityService },
    ]),
    districtController.createDistrict
  );
  router.patch(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getUpdateFilter(districtService, ["id"]),
    districtController.updateDistrict
  );
  router.delete(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getDeleteFilter(
      districtService,
      [userService],
      "districtId"
    ),
    districtController.deleteDistrict
  );

  app.use("/api/district/", router);
};

module.exports = { setRouter };
