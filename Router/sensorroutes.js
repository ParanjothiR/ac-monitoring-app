
const express=require("express")
const router=express.Router()
const dbstore = require("../Model/sensorvalue");
const validatesensordata = require("../Middleware/validatesensordata");
const validateToken=require("../Middleware/validateToken")

router.use(express.json())
router.post('/',validateToken,async (req, res) => {
    const { temperature, waterLevelPercentage, acState, acno, deviceid } = req.body;
    const timestamp = new Date();
    
    if (deviceid === "#1A6B9C"){
        // console.log(req.body);
        try {
            const newSensorData = new dbstore({
                temperature,
                waterLevelPercentage,
                acState,
                acno,
                deviceid,
                timestamp
            });
           //const data=newSensorData
            // console.log(newSensorData)

            const dataToSave = await newSensorData.save();
            validatesensordata(req,dataToSave)
        } catch (error) {
            console.error(error);
        }
    }
    //validatesensordata(newSensorData)
    res.status(200).json({ message: "get the post successfully" });
});

module.exports=router