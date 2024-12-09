const product = require("../../model/product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res.status(404).json({
        succes: false,
        message: "Keyword is required and must be in string",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearcQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await product.find(createSearcQuery);

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  searchProducts,
};
