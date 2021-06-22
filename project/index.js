const express=require('express')
const app=express();
const mongoose=require("mongoose");
const multer = require('multer');
app.use(express.static('uploads'));
app.use(express.json())

var cors=require("cors");
app.use(cors())




const {MONGOURI}=require("./key");
mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connect ok")
})
.catch((err)=>{
console.log(err)
});













const User = require("./models/user")
const Post=require("./models/post")

const authRoutes=require("./routes/auth")
const postroute=require("./routes/postroute")
const userroute=require("./routes/user")
app.use(authRoutes)
 
app.use(postroute)


app.use(userroute)









app.listen("1000",()=>{
    console.log("server listening")
})