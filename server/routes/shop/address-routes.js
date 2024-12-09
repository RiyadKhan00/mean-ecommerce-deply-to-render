const express = require("express");
const {
  addAdress,
  fetchAllAddress,
  deleteAddress,
  editAddress,
} = require("../../controller/shop/address-controllers");

const router = express.Router();

router.post("/add", addAdress);
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

module.exports = router;
