const mongoose = require("mongoose");
const superschema = mongoose.Schema({
    fullname :String,
    login:  String,
    password:  String,
    role: {
        type: String,
        default: "Super"
    },
},{strict:false})

const super_model = mongoose.model("super", superschema);

module.exports = super_model;
