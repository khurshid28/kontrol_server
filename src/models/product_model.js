const mongoose = require("mongoose");
const productschema = mongoose.Schema(
  { 
    category_id :String,
    name_uz: String,
    name_ru: String,
    price : Number,
    count : Number,
    image: String,
  },
  { strict: false, timestamps: true }
);
const product_model = mongoose.model("product", productschema);

module.exports = product_model;
