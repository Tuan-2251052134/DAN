const express = require("express");

const setConfig = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = { setConfig };
