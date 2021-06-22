const router = require('express').Router()
const User=require('../models/user')
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const key=require("../key")
var nodemailer = require('nodemailer');




function sendMail(from, appPassword, to, subject,  htmlmsg)
{
    console.log("email-------------------------")
    let transporter=nodemailer.createTransport(
        {
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:
            {
             //  user:"weforwomen01@gmail.com",
             //  pass:""
             user:from,
             pass:appPassword
            
    
            }
        }
      );
    let mailOptions=
    {
       from:from ,
       to:to,
       subject:subject,
       html:htmlmsg
    };
    transporter.sendMail(mailOptions ,function(error,info)
    {
      if(error)
      {
        console.log(error);
      }
      else
      {
        console.log('Email sent:'+info.response);
      }
    });
}

























router.get('/app',(req,res,next) => {    
    res.send("okkk")
})

// router.post("/signup",(req,res,next) => {

//     var {name,email,password,confirm_password} = req.body
//     hash_password =''
//     bcrypt.hash(password,12).then((password) => {
//         hash_password=password
//         User.findOne({email:email})
//         .then((user) => {
//             console.log(user,'------------hhh------------')
//             if((user)){
//                 return res.json({error:"user already present"})
//             }
            
//             else{
//                  User.create({ name:name,email:email,hash_password:password },(err,result)=>{
//                     if(err){
//                         console.log(err,'-------------------------------------')
//                         return res.send(err.errors)}


//                     else{
//                         return res.send(result)
//                     }
//                 });
                
                
//             }

           
            



//         })

//         .catch((err) => {
//             console.log("---------",err)
//             next(err)
//         })








//     })
//     .catch((err) => {
//         next(err)

//     })





// console.log("okkkkkkkkkkkkkkkkkkkkkkkkkkkk")



// })















router.post("/signup",async (req,res,next) => {
    console.log("---------------------------------------------")

    var {name,email,password,confirm_password} = req.body
    hash_password =''
    password=await bcrypt.hash(password,12)
    user=await User.findOne({email:email})
    console.log(user)
    if(user){
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
        return res.json({error:"email already present","status":0})
    }
try{
    data=await User.create({name:name,hash_password:password,email:email})

      sendMail("jhalanipriyansh25@gmail.com", "wxmionwkhvpxfrqo" , req.body.email, "Welcome to swipechat", `<h3>Hi ${req.body.name}</h3><br><p>Signup succesful!Welcome to swipechat. </p><br><h5>Thank You!</h5>` )
    return res.json({

        "status":1,
        "data":data
    })
        
    


}

catch(err){
    console.log(err,'ppppppppppppppppppppp')
res.json({

    "status":0,
    "error":err.errors

})
}

    
    
        


})























router.get("/userdata",(req,res,next)=>{
    User.find().then(data=>{
        console.log(data,'--')
        res.send(data)
    })

    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
})










router.post("/login",(req,res,next)=>{
    var {email,password}=req.body
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",email,password)
    User.findOne({email: email}).then((user)=>{
        if(user){

            bcrypt.compare(password,user.hash_password)
            .then((data)=>{

                if(data){
                    

                    jwt.sign({_id:user._id},key.key,(err,data)=>{
                        if(data){
                            return res.status(200).json({"success" :1,"token":data,id:user._id});


                        }
                        else if(err){
                            console.log(err,'---------');
                            return res.status(412).json({error :err})

                        }
                    })


                }
                else{
                    console.log('--nnnnnnnnnnnnnnnnnnn-------');

                    res.json({error :"password wrong",success :0})

                }
            })

            .catch((err) => {
                console.log('llll')
                return res.status(412).json(err)
            })
        }

        else{
            console.log('--nnnnnnnnnnnnnnnnnnn-------');

            return res.json({error :"user not found",success :0})
        }
    })

    .catch((err) => {
        console.log('l2lll',err)


        return res.json({error :err})


    })

})









module.exports=router