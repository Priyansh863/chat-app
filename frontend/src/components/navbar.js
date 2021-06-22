import React ,{useState,useContext} from 'react'
import {UserContext} from '../App'

import './navbar.css';



import {
   
    Link,useHistory
  } from "react-router-dom";

export default function Navbar() {















var    history=useHistory()

   

    function Head(){
        const {state,dispatch} = useContext(UserContext)
        if(state){
            return(

                <div>






<nav className="navBar">

<ul>

<li class="navbar-logo">
<Link to="/"  class="navbar-links">Home</Link>
</li>

<li className="navbar-toggle">
<i class="fa fa-bars icon"></i>
</li>

<li className="navbar-links">
<Link to="/profile" >Profile</Link>
</li>
<li className="navbar-links">
<Link to="/post" >Post</Link>
</li>

<li className="navbar-links">
<Link  onClick={()=>{
                    localStorage.removeItem("token")
                    dispatch({type:'Clear'})
                    history.push('/login')



                }} >Logout</Link>
</li>

</ul>

</nav>



</div>






                
            )
        }

        else{


            return (




                <div>






                <nav className="navBar">
                
                <ul>
                
                <li class="navbar-logo">
                <Link to="/login"  class="navbar-links">Home</Link>
                </li>
                
                <li class="navbar-toggle">
                <i class="fa fa-bars icon"></i>
                </li>
                
               
                <li class="navbar-links">
<Link to="/login" >Login</Link>
</li>
<li class="navbar-links">
<Link to="/sigin" >New Account</Link>
</li>
                
              
                
                </ul>
                
                </nav>
                
                
                
                </div>


)

            }

        }





        return(
            <div >










                {Head()}
            </div>

        )
       
    
}
