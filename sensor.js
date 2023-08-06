const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path=require('path')
const hbs = require('hbs');

const handlebars = require('handlebars');



//const dbstore = require("./Model/sensorvalue");
const url = process.env.URL;
const port = process.env.PORT;

mongoose.connect(url, { useNewUrlParser: true });
const cons = mongoose.connection;
cons.on('open', () => {
    console.log("Connected to MongoDB...");
});

handlebars.registerHelper('isString', function (value) {
    return typeof value === 'string';
});

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use("/api/sensordata",require("./Router/sensorroutes"))
app.use("/",require("./Router/userrouter"))
//app.use("/air",require("./Router/dashboard"))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
