const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECREAT,
});

const stroage = new multer.memoryStorage();

const ImageUploadUtil = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "EcommerceFirstProject",
  });

  return result;
};

const upload = multer({ stroage });

module.exports = { upload, ImageUploadUtil };
