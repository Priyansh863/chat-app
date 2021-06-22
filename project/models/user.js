const e = require('express')
const mongoose=require('mongoose')
const {ObjectId} =mongoose.Schema.Types

const userSchema=new mongoose.Schema({
name:{
    required:true,
    type:String
},
hash_password:{
    required:true,
    type:String
}
,


email:{
    type:String,
    required:true,
    unique:true,
}
,

usernames:{
    type:String,
    required:false
},

follower:[{type:ObjectId,
    ref:"User"
}],
following:[{type:ObjectId,
    ref:"User"
}]
,


photo:{
    type:String,
}


})


module.exports=mongoose.model('User',userSchema)