const setConfig = (app) => {
  app.use((err, req, res, next) => {
    console.log(err);
    res
      .status(err.status ?? 500)
      .json({ data: null, errorMessage: err.message });
  });
};

module.exports = { setConfig };
