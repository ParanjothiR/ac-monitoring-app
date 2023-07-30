const mongoose = require("mongoose")

const Schemadata= new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    devicesarray:[{type:String}]     
})
module.exports = mongoose.model('deviceslist',Schemadata);