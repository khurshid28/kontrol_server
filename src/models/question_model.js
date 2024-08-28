const mongoose = require("mongoose");
const questionschema = mongoose.Schema(
  { 
    question :String,
    answer: String,
  },
  { strict: false, timestamps: true }
);
const question_model = mongoose.model("question", questionschema);

module.exports = question_model;


