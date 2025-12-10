const { Router } = require("express");
const multerFilter = require("../filters/multerFilter");
const userController = require("../controllers/userController");
const securityFilter = require("../filters/securityFilter");

const setRouter = (app) => {
  const router = Router();

  router.post("/login", userController.login);
  router.post("/", multerFilter.single("avatar"), userController.register);
  router.get("/", userController.getUsers);
  router.get(
    "/profile",
    securityFilter.getRolesFilter(["ADMIN", "BUSINESS", "JOB_SEEKER"]),
    () => {}
  );

  app.use("/api/user", router);
};

module.exports = { setRouter };
