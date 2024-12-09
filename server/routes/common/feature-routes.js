const express = require("express");
const {
  addFeatureImage,
  getFeatureImage,
} = require("../../controller/common/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImage);

module.exports = router;
