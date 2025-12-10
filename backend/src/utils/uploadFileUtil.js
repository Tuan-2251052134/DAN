const AppError = require("../configs/AppError");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const uploadFile = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (error)
        return reject(
          new AppError("đã có lỗi trong quá trình upload hình", 500)
        );
      resolve(result.secure_url);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = { uploadFile };
