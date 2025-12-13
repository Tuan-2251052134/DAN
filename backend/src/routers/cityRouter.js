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
    securityFilter.getCreateFilter(["name"], null, []),
    cityController.createCity
  );
  router.put(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getUpdateFilter(cityService, ["id"], []),
    cityController.updateCity
  );
  router.delete(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getDeleteFilter(cityService, [districtService], "cityId"),
    cityController.deleteCity
  );

  app.use("/api/city", router);
};

module.exports = { setRouter };
