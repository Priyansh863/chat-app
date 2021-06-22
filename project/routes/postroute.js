const router = require("express").Router()
const mongoose=require("mongoose")
const Post=mongoose.model('Post')
const User=mongoose.model('User')
const multer = require('multer');
const loginrequired= require("../middleware/loginrequired")

const path=require("path")
// const bodyparser=require("body-parser")
// function check(req,res,next){
//   const {title,body} = req.body
//   console.log(req.body,'ppppphhppppppppp')
//   console.log(req.headers['authorization'])  
//   next()
// }
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname)
      
      
      )
    }
  })

var upload = multer({ storage: storage })


router.post("/createpost",loginrequired,upload.single("file"),(req, res,next) => {
    const {title,body} = req.body
    console.log(req.body,'---------------',req.headers['authorization'],req.user,'ppppppppppppppppppppppp')
    Post.create({title:title,body:body,photo:req.file.filename,postby:req.user
    },(err, data) => {
      if(err){
        return res.send({
          "error": err,
          "success":0

        })
      }
      else{
        return res.send({
          "data": data,
          "success":1

        })

      }
    })


  })



router.get("/getpost",(req,res)=>{

  console.log("don")

Post.find((err,data)=>{
if(err){
  console.log("don1")

  return res.send({
    "error": err,
    "success":0
})
}
else{
  console.log("don2")


  return res.send({
    "post": data,
    "success":1
  })
}  
}).populate("postby")
.populate("comment.postedby")
})








router.put("/likes",loginrequired,(req, res)=>{
  console.log(req.body.postId,req.user,'pppppppppppppppppppp')

Post.findByIdAndUpdate(req.body.postId,{

  $push:{Likes:req.user._id}

}

,{

new:true

}
).exec((err, data)=>{

  if(err){
    return res.send({
  "error": err,
      "success":0
})

  }
else{
  console.log(data,'-------------------------------')

  return res.send({
    "data": data,
    "success":1})
}
 })



})







router.put("/dislikes",loginrequired,(req, res)=>{

Post.findByIdAndUpdate(req.body.postId,{

  $pull:{Likes:req.user._id}

}

,{

new:true

}


).exec((err, data)=>{

  if(err){
    return res.send({
  "error": err,
      "success":0
})

  }
else{
  console.log(data,'-------------------------------')

  return res.send({
    "data": data,
    "success":1})
}
 })



})






router.put("/comment",loginrequired,(req, res)=>{
  console.log("enter comment",req.body.text)

  const comment = {
    text: req.body.text,
    postedby:req.user._id
  }

  Post.findByIdAndUpdate(req.body.postId,{
  
    $push:{comment:comment}
  
  }
  
  ,{
  
  new:true
  
  }
  )
  .populate('comment.postedby')
  
  .exec((err, data)=>{
  
    if(err){
      console.log(err,'[[[[[[[[[[')
      return res.send({
    "error": err,
        "success":0
  })
  
    }
  else{
    console.log(data,'-------------------------------')
  
    return res.send({
      "data": data,
      "success":1})
  }
   })
  
  
  
  })
  
  







module.exports=router