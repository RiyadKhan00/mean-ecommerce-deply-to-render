const express = require("express");
const {
  getFilterProducts,
  getProductDetails,
} = require("../../controller/shop/products-controller");

const router = express.Router();

router.get("/get", getFilterProducts);

router.get("/get/:id", getProductDetails);
module.exports = router;
