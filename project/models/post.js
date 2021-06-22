const mongoose=require("mongoose")
const User = require("./user")
const {ObjectId} =mongoose.Schema.Types
const postSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
},
body : {
    type:String,
    required:true,
},
photo :{
    type:String,
    default:"no photo"
},

postby:{
    type:ObjectId,
    ref:"User"

},
Likes:[{
    type:ObjectId,
    ref:"User"

}],

comment:[{
    text:String,
    postedby:{
        type:ObjectId,
        ref:"User"
    
    }
}]


})


module.exports =mongoose.model("Post",postSchema)