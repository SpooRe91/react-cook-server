const express = require("express");
const router = express.Router();

const homePageController = require("./controllers/homePageController");
// const postgresTest = require('./controllers/postgresTest');
const editController = require("./controllers/editController");
const searchController = require("./controllers/searchController");
const createController = require("./controllers/createController");
const authController = require("./controllers/authController");
const nasaController = require("./controllers/nasaController");

router.use((req, res, next) => {
  console.log(
    `ORIGIN: ${req.headers.host} - REQUEST: ${req.method} >> PATH: ${req.path}`
  );
  next();
});
router.use(homePageController, /*postgresTest,*/ editController);
router.use("/auth", authController);
router.use("/recipe", searchController, createController);
router.use("/nasa", nasaController);
router.get("*", (req, res) => {
  res.status(404).json({ message: "Invalid API path!" });
});

module.exports = router;
