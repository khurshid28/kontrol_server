const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    fullname :String,
    phone:  String,
    role: {
        type: String,
        default: "User"
    },
    
   
},{strict:false})


const user_model = mongoose.model("user", userschema);

module.exports = user_model;
