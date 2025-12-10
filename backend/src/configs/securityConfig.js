const cors = require("cors");
const setConfig = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
};

module.exports = { setConfig };
