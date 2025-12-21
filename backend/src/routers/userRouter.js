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
    "/admin/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    userController.getUser
  );
  router.get(
    "/profile",
    securityFilter.getRolesFilter(["BUSINESS", "JOB_SEEKER"]),
    userController.getUserProfile
  );
  router.put(
    "/profile",
    securityFilter.getRolesFilter(["BUSINESS", "JOB_SEEKER"]),
    multerFilter.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cv", maxCount: 1 },
    ]),
    securityFilter.getUpdateFilter(
      userService,
      ["id", "email", "role"],
      [{ key: "districtId", service: districtService }],
      "bản thân",
      true
    ),
    userController.updateUserProfile
  );
  router.put(
    "/admin/:id",
    securityFilter.getRolesFilter(["ADMIN"]),
    multerFilter.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cv", maxCount: 1 },
    ]),
    securityFilter.getUpdateFilter(
      userService,
      ["email", "id"],
      [{ key: "districtId", service: districtService }],
      "người dùng"
    ),
    userController.updateUser
  );

  app.use("/api/user", router);
};

module.exports = { setRouter };
