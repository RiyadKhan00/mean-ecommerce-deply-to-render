const Feature = require("../../model/Feature");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    const featuresImage = new Feature({
      image,
    });

    await featuresImage.save();

    res.status(201).json({
      success: true,
      data: featuresImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const getFeatureImage = async (req, res) => {
  try {
    const images = await Feature.find({});
    res.status(201).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImage };
