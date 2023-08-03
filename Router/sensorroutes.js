
const express=require("express")
const router=express.Router()
const dbstore = require("../Model/sensorvalue");
const validatesensordata = require("../Middleware/validatesensordata");
//const validateToken=require("../Middleware/validateToken")

router.use(express.json())


router.post('/',async (req, res) => {
    console.log(req.body)
    const { temperature, waterLevelPercentage, acState, acno,Airquality,deviceid } = req.body;
    const timestamp = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
    let air=Airquality;
    air=air.replace(/\n/g,'');
        // console.log(req.body);
        console.log(air)
        try {
            const newSensorData = new dbstore({
                temperature,
                waterLevelPercentage,
                acState,
                acno,
                deviceid,
                Airquality:air,
                timestamp
            });
           //const data=newSensorData
            // console.log(newSensorData)

            const dataToSave = await newSensorData.save();
            console.log(dataToSave)
            validatesensordata(dataToSave)
        } catch (error) {
            console.error(error);
        }
    
    //validatesensordata(newSensorData)
    res.status(200).json({ message: "get the post successfully" });
});

module.exports=router
