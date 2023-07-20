const mongoose = require("mongoose")

const Schemadata= new mongoose.Schema({
    deviceid:{
        required:true,
        type:String,
        unique:true
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
})
module.exports = mongoose.model('uservalues',Schemadata);