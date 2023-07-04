const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path")

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>res.send("hello"));

app.post("/submit",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    if(!fs.existsSync(path.join(__dirname,"/data.json"))){
        res.status(204).end();
    }else{
        fs.readFile(path.join(__dirname,"/data.json"), "utf-8", (err, data) => {
        
            data = JSON.parse(data);
            const val=data.some((user)=>user.email === email && user.password===password)
            if(val){
                res.status(200).send('userData');
            }
            else{
                res.statusMessage = "User Not Found";
                res.status(204).end();
            }
       })
    }

    
});
app.post("/signup",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name

    if(!fs.existsSync(path.join(__dirname,"/data.json"))){
        let arr =[]
        fs.writeFile(path.join(__dirname,"/data.json"),JSON.stringify(arr),(err)=>console.log(err));
    }
  
    fs.readFile(path.join(__dirname,"/data.json"), "utf-8", (err, data) => {
        if(!data){
            let arr =[]
            fs.writeFile(path.join(__dirname,"/data.json"),JSON.stringify(arr),(err)=>console.log(err));
        }else if (data) {
            console.log(data);
            let arr = JSON.parse(data) || []
            const val=arr.some((user)=>user.email === email && user.password===password)
            if(!val){
                arr.push({
                    name :  name,
                    email: email,
                    password: password,
                })
                fs.writeFile(path.join(__dirname, "/data.json"), JSON.stringify(arr), (err) => {
                    if(!err){
                        console.log('Updated Successfull')
                        res.statusMessage='Sign up success'
                        res.sendStatus(200).end()
                    }
                    else{
                        console.log('Error Updating data ' + err)
                        res.statusMessage='Server error'
                        res.sendStatus(500).end()
                    }
                })
            }
            else{
                console.log('Already exists')
                res.statusMessage='Server error'
                res.sendStatus(204).end()
            }
        }
        
    })
    
});

app.listen(5000,()=>console.log("server started!"));