const express = require("express");
const mongoose = require("mongoose");
const port = process.env.port || 3000;
const mongodburl = process.env.mongodburl || 'mongodb://localhost:27017/usersdb'
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json())
app.get("/",(req,res)=>{
    res.send("welcome....");
})


app.use("/users",require("./routes/User"));
mongoose.connect(mongodburl,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }).then(()=>{
      console.log("connected to db")
  }).catch(err=>{
      console.log("not connected");
  })


app.listen(port,()=>{
    console.log("connected ...");
});



