import React ,{useState,useEffect} from 'react'
import './Login.css';
import axios from 'axios'
import validator from 'validator'

export default function Signin(props) {
    
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirm_password,setConfirmPassword]=useState('')





    
    const [nameerror,setNameError]=useState('')
    const [emailerror,setEmailError]=useState('')
    const [passworderror,setPasswordError]=useState('')
    const [confirm_passworderror,setConfirmPasswordError]=useState('') 


function errorcheck(){
    
    var isvalid=true

    if(!validator.isEmail(email)){
        isvalid=false;
        setEmailError("mail not valid")
    }



    if(!validator.isLength(email,1,200)){
        isvalid=false;
        setEmailError("user email not valid")
    }


    if(!validator.isLength(name,4,20)){
        isvalid=false;
        setNameError("user name not valid")
    }


  


    if(!validator.isLength(confirm_password,4,20)){
        isvalid=false;
        setConfirmPasswordError("confirm_password not   valid")
    }




    if(!validator.isLength(password,4,20)){
        isvalid=false;
        setPasswordError("password cannot  valid")
    }




    if(password!=confirm_password){
        isvalid=false;
        setEmailError("password cannot  match")
    }


    if(isvalid==false){
        return 0;
    }
    else{
        return 1;
    }



}
function setValue(e){

    e.target.name=="name" && setName(e.target.value)
    e.target.name=="email" && setEmail(e.target.value)

    e.target.name=="password" && setPassword(e.target.value)

    e.target.name=="confirm_password" && setConfirmPassword(e.target.value)


}


    function adddata(){
        var p=errorcheck()

        if(p){
            var s={
                name,email,password,confirm_password
            }
    
            axios.post("http://localhost:1000/signup",s).then((data)=>{
                if(data.data.status==0){
                    alert(data.data.error)

                   

                        }

                else if(data.data.status==1){
                    props.history.push("/login")
                
                }
              
    
            })
            .catch((err)=>{
                alert(err)
            })

        }

        




    }


    return (
        <div>
        <div className="container ">

        
<form className="form">
<p >
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSorvpeWodtDc-Hx2x6KYJ1bs4TJMAN741qDglSakmHHvy3Ttzj5do3rSKU4ROr4ZAOzUE&usqp=CAU"></img>

</p>

<h1> SignUp</h1>
<br></br>



<input type="text" placeholder="name"  name="name"   onChange={(e)=>{setValue(e)}} id="name" className="one" value={name}    />
<span style={{color: "red"}}>{nameerror}</span>
<br></br>



<input type="text" placeholder="email" id="email" name="email" className="one" value={email} onChange={(e)=>{setValue(e)}}  />
<span style={{color: "red"}}>{emailerror}</span>
<br></br>

<input type="password" placeholder="password"  name="password"id="password" className="one" value={password} onChange={(e)=>{setValue(e)}}  />
<span style={{color: "red"}}>{passworderror}</span>
<br></br>
<input type="password" placeholder="Confirm password"  name="confirm_password"id="Confirm password" className="one" value={confirm_password} onChange={(e)=>{setValue(e)}}  />
<span style={{color: "red"}}>{passworderror}</span>














<br></br>
<input type="button" className="btn"  onClick={()=>{adddata()}} value="Signup"></input>
<br></br>
<div className="end">
<a href="/" className="password">SignUp With gmail</a>
<a href="/" className="account">Already have account</a>
</div>





</form>

</div>
        </div>
    )
}
