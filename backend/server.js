const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path")
const mongoose = require("mongoose");
const dbURL = "mongodb+srv://bhavdeepkaushal392:root@cluster0.jwx3cxn.mongodb.net/test"
const User = require("./Modals/Users.js");
const Weather = require("./Modals/Weather.js");
const axios = require("axios");

const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>res.send("hello"));

mongoose.connect(dbURL,connectionParams).then(()=>console.log("databse connected!")).catch(err=>console.log("Error:",err));


// routes
app.post("/submit",async(req,res)=>{
    const mail = req.body.email;
    const pass = req.body.password;
    
    try{
        const isExisting = await User.findOne({email : mail});
        console.log(isExisting);
        if(isExisting){
            const {email, password} = isExisting;

            if(email==mail && password==pass){
                res.status(201).json(isExisting);
            }else{
                res.status(203).send("Wrong crendentials!");
            }
            
        }else{
            res.status(204).send("User Not Found!");
        }
        
    }catch(err){
        res.statusMessage="Error logging in!";
        res.status(500).end();
    }
   
    
});

// route2
app.post("/signup",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    const isExisting = await User.findOne({email : email});
    
    try{
        if(isExisting){
            res.statusMessage = "user Already exists!";
            res.status(204).end()
        }else{
            const data = {name : name, email : email , password : password}
            const newUser = await User.create({...data});
            console.log("new User created!!");
            res.status(201).json(newUser);
            
        }
    }catch(err){
        res.status(500).json(err.message);
    }
   
});

// route3
app.post("/homepage",async(req,res)=>{
   const name = req.body.name
   try{
    // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=2c3983e81031a8fa2a2728c29bdfc5bf`);
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a6720265fb7c6bc8c4f3afa18dc26ece`);
    
    const newData = {
        name : name,
        pressure : response.data.main.pressure,
        windSpeed : response.data.wind.speed,
        humidity : response.data.main.humidity,
        temperature : response.data.main.temp,
        description : response.data.weather[0].description
      }
      console.log({...newData});

    const isExisting = await Weather.findOne({name : name});
    if(isExisting){
        // console.log("exists!")
        const newWeather = await Weather.updateOne({name : name},{...newData});
        res.statusMessage = "updates sucessfully!"
        res.status(201).json(newData);
    }else{
        const newWeather = await Weather.create({...newData});
        res.statusMessage = "data added sucessfully!";
        res.status(201).json(newData);
        
    }
   }catch(err){
    const isExisting = await Weather.findOne({name : name});

    if(isExisting){
        res.status(201).json(isExisting);
    }else{
        res.status(204).json("Unable to fetch weather!")
    }
    // res.status(500).json(err.message);
   }
})

app.listen(5000,()=>console.log("server started!"));