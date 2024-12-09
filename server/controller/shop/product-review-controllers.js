const product = require("../../model/product");
const ProductReview = require("../../model/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const checkExistingfReview = await ProductReview.findOne({
      productId,
      userId,
    });

    if (checkExistingfReview) {
      return res.status(500).json({
        success: false,
        message: "You already reviewed thsi product",
      });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await ProductReview.find({ productId });
    const totalReviewsLength = reviews.length;

    const averageReview =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const review = await ProductReview.find({ productId });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReviews };
