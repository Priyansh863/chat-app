var initialState=null
export function Login (state=initialState,action){
    switch(action.type)
    {
        case "LOGIN": 
            console.log(action.payload,'----------------------------------------------------')
            state=action.payload 
            return state;
        case "LOGOUT":
            state=null
                      
        default:               
           return localStorage.getItem("token");
    }
}