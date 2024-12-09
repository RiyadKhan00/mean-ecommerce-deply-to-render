const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATA_URL)
  .then(() => console.log("Data base is connected"))
  .catch((err) => console.log(err));
