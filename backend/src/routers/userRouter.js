const { Router } = require("express");
const multerFilter = require("../filters/multerFilter");
const userController = require("../controllers/userController");
const userService = require("../services/userService");
const districtService = require("../services/districtService");
const securityFilter = require("../filters/securityFilter");

const setRouter = (app) => {
  const router = Router();

  router.post("/login", userController.login);
  router.post(
    "/",
    multerFilter.single("avatar"),
    securityFilter.getCreateFilter(
      ["districtId", "address", "role", "password", "name", "email", "file"],
      null,
      [{ key: "districtId", service: districtService }],
      "nguời dùng"
    ),
    userController.register
  );
  router.get(
    "/",
    securityFilter.getRolesFilter(["ADMIN"]),
    userController.getUsers
  );
  router.get(
    "/:id",
    securityFilter.getRolesFilter(["ANY"]),
    userController.getUser
  );
  router.get(
    "/profile",
    securityFilter.getRolesFilter(["BUSINESS", "JOB_SEEKER"]),
    () => {}
  );
  router.put(
    "/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    securityFilter.getUpdateFilter(
      userService,
      ["email", "id"],
      [{ key: "districtId", service: districtService }],
      "người dùng"
    ),
    userController.updateUser
  );

  router.delete("/:id", (req, res) => {
    res.json("gg");
  });

  app.use("/api/user", router);
};

module.exports = { setRouter };
