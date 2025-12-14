const { Router } = require("express");
const cityController = require("../controllers/cityController");
const securityFilter = require("../filters/securityFilter");
const districtService = require("../services/districtService");
const cityService = require("../services/cityService");

const setRouter = (app) => {
  const router = Router();

  router.get("/", cityController.getCities);
  router.get("/:id", cityController.getCity);
  router.post(
    "/",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getCreateFilter(["name"], null, [], "thành phố"),
    cityController.createCity
  );
  router.put(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getUpdateFilter(cityService, ["id"], [], "thành phố"),
    cityController.updateCity
  );
  router.delete(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getDeleteFilter(
      cityService,
      [{ service: districtService, label: "quận" }],
      "cityId",
      "thành phố"
    ),
    cityController.deleteCity
  );

  app.use("/api/city", router);
};

module.exports = { setRouter };
