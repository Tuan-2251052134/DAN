const AppError = require("../configs/AppError");
const userService = require("../services/userService");
const securityUtil = require("../utils/securityUtil");

const getRolesFilter = (roles) => {
  return async (req, res, next) => {
    const auth = req.headers["authorization"];

    if (!auth && !roles.includes("ANY")) {
      throw new AppError("Chưa xác thực quyền", 401);
    }

    const token = auth?.split(" ")[1];
    if (!token && !roles.includes("ANY")) {
      throw new AppError("Chưa xác thực quyền", 401);
    }

    if (token) {
      const decoded = securityUtil.decodeJwt(token);

      if (!roles.includes(decoded.role) && !roles.includes("ANY")) {
        throw new AppError("Không có quyền truy cập", 403);
      }

      const user = await userService.getOne({ email: decoded.email });
      req.user = user;
    }

    next();
  };
};

//delete

const getDeleteFilter = (service, checkers, key, label) => {
  return async (req, res, next) => {
    const user = req.user;
    const id = req.params.id;
    const obj = await service.getOne({ id });

    if (!obj) {
      throw new AppError(`Không tìm thấy ${label}`, 401);
    }


    if (obj.userId !== user.id && user.role != "ADMIN") {
      throw new AppError(`Không thể xoá ${label} không phải của mình`, 401);
    }

    for (let checker of checkers) {
      const refObj = await checker.service.getOne({ [key]: obj.id });
      console.log(refObj)
      if (refObj) {
        throw new AppError(
          `Vẫn đang có ${checker.label} thuộc đối tượng này`,
          400
        );
      }
    }

    console.log("gg");

    req.obj = obj;
    next();
  };
};

const getRetriveFilter = (service, label) => {
  return async (req, res, next) => {
    const user = req.user;
    const id = req.params.id;
    const obj = await service.getOne({ id });

    if (obj.userId !== user.id && user.role != "ADMIN") {
      throw new AppError(`Không thể xem ${label} không phải của mình`, 403);
    }

    req.obj = obj;
    next();
  };
};

const getCreateFilter = (keys, roles, foreignFields, label) => {
  return async (req, res, next) => {
    const body = req.body;
    const user = req.user;
    const file = req.file;

    if (!body) {
      throw new AppError("body trống", 400);
    }

    body.file = file;

    for (let key of keys) {
      if (!body[key]) {
        throw new AppError(`không để trống trường: ${key}`, 400);
      }
    }
    if (user) {
      if (user.role === "ADMIN") {
        if (keys.includes("userId")) {
          const foundUser = await userService.getOne({ id: body.userId });

          if (!roles.includes(foundUser.role)) {
            throw new AppError(
              `Không thể tạo cho vai trò ${foundUser.role}`,
              400
            );
          }
        }
      } else if (keys.includes("userId") && user.id != body.userId) {
        throw new AppError(`Không thể ${label} cho người khác`, 403);
      }
    }

    for (let foreignField of foreignFields) {
      const refObj = await foreignField.service.getOne({
        id: body[foreignField.key],
      });
      if (!refObj) {
        throw new AppError(`Không tồn tại ${foreignField.label} này`, 400);
      }
    }

    next();
  };
};

// update
const getUpdateFilter = (
  service,
  constantFields,
  foreignFields,
  label,
  isProfile
) => {
  return async (req, _, next) => {
    const user = req.user;
    const file = req.file;
    const id = isProfile ? user.id : req.params.id;
    const body = req.body;

    body.file = file;

    const obj = await service.getOne({ id });

    if (!obj) {
      throw new AppError(`Không tìm thấy ${label} này`, 400);
    }

    if (obj.userId && obj.userId !== user.id && user.role != "ADMIN") {
      throw new AppError(
        `Không thể thay đổi trên ${label} không phải của mình`,
        400
      );
    }

    for (let field of constantFields) {
      let currentField = obj[field];

      if (obj[field] instanceof Date) {
        currentField = obj[field].toISOString();
      }

      if (`${body[field]}` != currentField) {
        throw new AppError(`Không thể thay đổi trường: ${field}`, 400);
      }
    }

    for (let foreignField of foreignFields) {
      if (!body[foreignField.key]) {
        throw new AppError(`Trường ${foreignField.key} bị trống`, 400);
      }

      const refObj = await foreignField.service.getOne({
        id: body[foreignField.key],
      });

      if (!refObj) {
        throw new AppError(`${foreignField.label} không tồn tại`, 400);
      }
    }

    next();
  };
};
module.exports = {
  getRolesFilter,
  getCreateFilter,
  getUpdateFilter,
  getDeleteFilter,
  getRetriveFilter,
};
