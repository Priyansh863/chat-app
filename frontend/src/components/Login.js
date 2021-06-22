import React ,{useState,useContext} from 'react'
import {UserContext} from '../App'
import './Login.css';
 import axios from 'axios'
// import {createLogin} from '../action/loginaction'
// import { useDispatch } from 'react-redux';

import {
   
    useHistory
  } from "react-router-dom";

export default function Login(props) {
    const {state,dispatch} = useContext(UserContext)


    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    function setvalue(e){
        e.target.name=="email" && setEmail(e.target.value)
        e.target.name=="password" && setPassword(e.target.value)
    }
  


function login(){

  


    const s={
        email,password
    }


    axios.post("http://localhost:1000/login",s)
    .then((data)=>{
        if(data.data.success==1){
            var token=data.data.token
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('id', data.data.id);
            dispatch({type:"User",payload:localStorage.getItem('token')})

            // dispatch(createLogin(localStorage.getItem('token'))); 
            props.history.push("/")
            
            
        }
        else if(data.data.success==0){
            setError(data.data.error)
            console.log(data.data.error)



        }
    })

}


    return (
        <div className="container ">

        
            <form className="form">
            <p >
            <img src="https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png"></img>

            </p>

            <h1> Login</h1>

            <br></br>
            <span style={{color: "red",textAlign:"center"}}>{error}</span>
<br></br>
           
            <label for="username">Email</label>
            <br></br>
            
            
            <input type="text" placeholder="Username" name="email"  value= {email} onChange={(e)=>{
                setvalue(e)
            }} id="username" className="one" />
            <br></br>
            
            <label for="password">Password</label>
            <br></br>
            
            <input type="password" placeholder="password" id="password" name="password"  value= {password} onChange={(e)=>{
                setvalue(e)}} className="one"/>
          
            <br></br>
            <br></br>
            

            <input type="button" className="btn" onClick={login} value="Login"></input>
            <br></br>
            <div className="end">
            <a href="/" className="password">Forgot Password</a>
            <a href="/" className="account">Create Account</a>
            </div>

           



        </form>

        </div>
    )
}
