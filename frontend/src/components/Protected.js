import { Children } from "react";
import { Route ,Redirect} from "react-router";

export const PrivateRoute=({children,...rest}) =>{
    var token=localStorage.getItem("token")
  

    return (

        <Route {...rest} render={()=> token ? (children): (<Redirect to="/login" />)} />
    )
}


