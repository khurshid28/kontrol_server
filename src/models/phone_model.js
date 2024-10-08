


const mongoose = require("mongoose");

const phoneschema = mongoose.Schema({
    id: Number,
    num:  String,
    code : String,
    date: {
        type: Date,
        default: Date.now,
    },
},{strict:false})

const phone = mongoose.model("phone", phoneschema);

module.exports = phone;