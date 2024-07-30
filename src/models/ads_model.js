const mongoose = require("mongoose");
const Adsschema = mongoose.Schema(
  {
    title: String,
    image: String,
  },
  { strict: false, timestamps: true }
);
const ads_model = mongoose.model("ads", Adsschema);

module.exports = ads_model;
