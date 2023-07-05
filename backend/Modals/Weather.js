const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    pressure:{
        type:String,
        required : true
    },
    windSpeed:{
        type:String,
        required : true
    },
    humidity:{
        type:String,
        required : true
    },
    temperature:{
        type:String,
        required : true
    }
    

},{timestamps : true});


module.exports = mongoose.model("Weather",WeatherSchema);