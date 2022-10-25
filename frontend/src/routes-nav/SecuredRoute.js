import React, {useContext} from "react"
import {Navigate} from "react-router-dom"
import UserContext from "../auth/UserContext"

function SecuredRoute({children}){
    const{currentUser} = useContext(UserContext);

    if(currentUser){
        return (children)
    } else{
        return <Navigate to="/login" />
    }
}

export default SecuredRoute
