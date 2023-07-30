const mongoose = require("mongoose")

const Schemadata= new mongoose.Schema({
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    phoneno:{
        require:true,
        type:String
    }
})
module.exports = mongoose.model('uservalues',Schemadata);