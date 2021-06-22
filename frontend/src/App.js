import logo from './logo.svg';
import './App.css';
import {useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/navbar';
import {initialState,reducer} from './reducer/Userreducer'
// import { useDispatch } from 'react-redux';
// import {createLogin} from './action/loginaction'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Login from './components/Login';
import Signin from './components/Signin';
import Profile from './components/Profile';
import Home from './components/Home';
import Otheruser from './components/Otheruser';

import Post from './components/Post';
import { useSelector } from 'react-redux';
import UserProfile from './components/Userprofile';
import { PrivateRoute } from './components/Protected';
export const UserContext=createContext()





function Routing(){

  var history=useHistory()
  const {state,dispatch} = useContext(UserContext)
useEffect(()=>{

if(localStorage.getItem("token")){

      dispatch({type:"User",payload:localStorage.getItem('token')})
}
else if(!state){
  alert("o1k" )
  alert(state)
      history.push("/login")


    }
  
  },[])
  return(

    <Switch>
    <PrivateRoute exact path="/"  >
<Home />
    </PrivateRoute>

          <Route exact path="/login" component={Login} />
          

          <Route exact path="/sigin" component={Signin} />
          <PrivateRoute exact path="/profile"  >
          <Profile />

          </PrivateRoute>

          <PrivateRoute exact path="/post"  >
          <Post />

          </PrivateRoute>


          <PrivateRoute exact  path="/profile/:id"  >
          <Otheruser />

          </PrivateRoute>



           
          
        </Switch>

    
  )
}























function App(props) {
  const [state,dispatch]=useReducer(reducer,initialState)
  
  
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <div>
    <Router>

    <Navbar />

    <Routing />

    </Router>

    </div>
    </UserContext.Provider>
  );
}







export default App;
