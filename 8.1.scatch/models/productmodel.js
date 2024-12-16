const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: String,
  name: String,
  price: Number,
  discount: { type: Number, default: 0 },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

const productModel = mongoose.model("products", productSchema);

module.exports = {
  productModel: productModel,
};
