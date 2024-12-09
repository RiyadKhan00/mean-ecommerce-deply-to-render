const { ImageUploadUtil } = require("../../helpers/cloudinary");
const product = require("../../model/product");

const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();
const path = require("path");

const handleImageUpload = async (req, res) => {
  try {
    // const b64 = Buffer.from(req.file.buffer).toString("base64");
    // const url = "data:" + req.file.mimetype + ";base64," + b64;
    const fileExt = path.extname(req.file.originalname).toString();
    const url = parser.format(fileExt, req.file.buffer);

    const result = await ImageUploadUtil(url.content);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreateProduct = new product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreateProduct.save();

    res.status(201).json({
      success: true,
      data: newlyCreateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProduct = await product.findById(id);

    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock =
      totalStock === "" ? 0 : totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

// delete a product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const Product = await product.findByIdAndDelete(id);

    if (!Product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
