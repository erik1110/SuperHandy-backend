var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const handleErrorAsync = require("../service/handleErrorAsync");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get(
  "/profile",
  handleErrorAsync(async (req, res, next) => {
    res.send("respond your request [get]/account/profile  ");
  })
);
router.patch(
  "/profile",
  handleErrorAsync(async (req, res, next) => {
    res.send("respond your request [patch]/account/profile  ");
  })
);
router.get(
  "/info-form",
  handleErrorAsync(async (req, res, next) => {
    res.send("respond your request [get]/account/info-form  ");
  })
);
router.patch(
  "/info-form",
  handleErrorAsync(async (req, res, next) => {
    res.send("respond your request [patch]/account/info-form  ");
  })
);

module.exports = router;
