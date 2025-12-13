require("dotenv").config();

const express = require("express");

const errorConfig = require("./configs/errorConfig");
const securityConfig = require("./configs/securityConfig");
const cloudinaryConfig = require("./configs/cloudinaryConfig");
const bodyConfig = require("./configs/bodyConfig");

const jobRouter = require("./routers/jobRouter");
const userRouter = require("./routers/userRouter");
const districtRouter = require("./routers/districtRouter");
const cityRouter = require("./routers/cityRouter");
const typeRouter = require("./routers/typeRouter");
const cvRouter = require("./routers/cvRouter");
const applyRouter = require("./routers/applyRouter");

const app = express();

securityConfig.setConfig(app);
cloudinaryConfig.setConfig();
bodyConfig.setConfig(app);

jobRouter.setRouter(app);
userRouter.setRouter(app);
districtRouter.setRouter(app);
cityRouter.setRouter(app);
typeRouter.setRouter(app);
cvRouter.setRouter(app);
applyRouter.setRouter(app);

errorConfig.setConfig(app);

app.listen(8080, () => {
  console.log("chào Lý Gia Tuấn, rất vui được gặp bạn");
});

module.exports = app;
