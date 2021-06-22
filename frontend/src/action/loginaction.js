export var createLogin = (t)=>{
    return {
        type:"LOGIN",
        payload:t
    }
}


export var removeLogin = (t)=>{
    return {
        type:"LOGOUT",
        payload:t
    }
}


