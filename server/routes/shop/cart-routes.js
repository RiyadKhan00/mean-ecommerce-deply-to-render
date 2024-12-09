const express = require("express");
const {
  addToCart,
  fetchCartItam,
  updateCartItem,
  deleteCartItem,
} = require("../../controller/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItam);
router.put("/update-cart", updateCartItem);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
