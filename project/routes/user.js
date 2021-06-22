const router = require('express').Router()
const mongoose=require("mongoose")

const User=mongoose.model('User')

const Post=mongoose.model('Post')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const multer = require('multer');
const loginrequired= require("../middleware/loginrequired")

const path=require("path")
const key=require("../key")






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








router.patch("/updateprofile",loginrequired,upload.single("file"),(req,res)=>{
    console.log("entery",req.file.filename)
User.findByIdAndUpdate(req.user._id,{
    photo:req.file.filename
}  
,

{
new:true
}
).then((data)=>{
    console.log("ok done",data.photo)
    res.send({success:1,data:data})
})

.catch((err)=>{
    res.send({success:0,error:"something wrong"})


})










})













router.get("/user/:id",(req,res,next)=>{
    User.findOne({_id:req.params.id})
    .then((user)=>{
        Post.find({postby:req.params.id})
        .populate("postby")
        .exec((err,post)=>{
            if(err){
                return res.json({success:0,error:err})
            }

            else{
                console.log(post)
                return res.send({user:user,post:post,success:1})
            }
        })

    })

    .catch((err)=>{
        return res.json({success:0,error:err})


    })

})


router.get("/post/:id",loginrequired,(req,res,next)=>{
Post.find({postby:req.params.id})
        .populate("postby")
        .exec((err,data)=>{
            if(err){
                return res.json({success:0,error:err})
            }

            else{
                console.log(JSON.stringify(data))
                return res.json(JSON.stringify(data))
            }
        })

    })




  








    router.patch("/follow",loginrequired,(req,res)=>{
        console.log("entery",req.body)
        User.findByIdAndUpdate({_id:req.body.id},{
            $push:{followers:req.user._id}
        }
        ,{
            new:true
        }
        
        )

        .populate("follower")
        .populate("following")



.then((user)=>{






    User.findByIdAndUpdate({_id:req.user._id},{
        $push:{following:req.body.id}
    }
    ,{
        new:true
    }
    
    )
    .then((data)=>{
        console.log("okk")

            res.json({success:1,data:user})
    })



    .catch((err)=>{
        res.json({success:0,data:err})
    
    
    })






})

.catch((err)=>{
    res.json({success:0,data:err})


})






    })












    router.patch("/unfollow",loginrequired,(req,res)=>{
        User.findByIdAndUpdate({_id:req.body.id},{
            $pull:{followers:req.user._id}
        }
        ,{
            new:true
        }
        
        )



.then((data)=>{






    User.findByIdAndUpdate({_id:req.user._id},{
        $pull:{following:req.body.id}
    }
    ,{
        new:true
    }
    
    )
    .then((data)=>{

            res.json({success:1})
    })



    .catch((err)=>{
        res.json({success:0,data:err})
    
    
    })






})

.catch((err)=>{
    res.json({success:0,data:err})


})






    })









module.exports=router