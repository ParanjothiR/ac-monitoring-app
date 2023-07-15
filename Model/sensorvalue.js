const mongoose = require("mongoose")

const Schemadata= new mongoose.Schema({
    temperature:{
        required:true,
        type:String
    },
    waterLevelPercentage:{
        required:true,
        type:String
    },
    acState:{
        required:true,
        type:String
    },
    acno:{
        required:true,
        type:String
    },
    deviceid:{
        required:true,
        type:String
    }

})
module.exports = mongoose.model('sensorvalue',Schemadata);