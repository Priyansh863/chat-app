const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const key=require("../key");
const User = require('../models/user');


 function loginauth(req, res, next){

    const header=req.headers['authorization']
    console.log(req.body,'--hhhhhhhhhhjjhhhhhhhhhhhhhhhhhhhhhhhh-',req.headers['authorization'],req.body)
    if(!header){

       return res.json({error:"must be log in"})
    }
    else{   
        console.log("donnn1")

        token=header.split(' ')[1]
        jwt.verify(token,key.key,(err,payload)=>{

            if(err){
                console.log("donnn2")

                return res.json({error:"token is not valid"})
            }
            else{
                console.log("donnn3")

                // console.log(payload,'[[[[[[[[[[[[')

                const {_id}=payload
                console.log(_id)
                User.findById(_id).then((user,err)=>{
                    if(user){
                    req.user=user
                    next()

                    }
                    else{

                        return res.json({error:"user not found"})
                    }

                })
                .catch((error)=>{

                    return res.json({error:"token is  valid"})


                })

            }

      })

    }
}

module.exports =loginauth