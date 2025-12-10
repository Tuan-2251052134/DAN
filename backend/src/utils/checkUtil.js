const AppError = require("../configs/AppError");

const messageMap = {
  id: "id",
  name: "tên",
  cityId: "thành phố",
};

const checkNullField = (object, fields) => {
  if (!object) {
    throw new AppError(`Body không thể để trống`, 400);
  }
  for (let field of fields) {
    if (!object[field]) {
      throw new AppError(
        `Trường này không thể để trống: ${messageMap[field]}`,
        400
      );
    }
  }
};

const checkChangeField = (object, foundedObject, notAllowFields) => {
  for (let field of notAllowFields) {
    if (object[field] !== foundedObject[field]) {
      throw new AppError(
        `Trường này không thể thay đổi: ${messageMap[field]}`,
        400
      );
    }
  }
};


module.exports = { checkNullField, checkChangeField };
