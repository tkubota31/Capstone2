import React from "react"
import {Routes,Route,Navigate} from "react-router-dom"
import RegisterationForm from "../auth/RegisterationForm"
import LoginForm from "../auth/LoginForm"

function AllRoutes({login, register}){

    return(
        <div>
            <Routes>
                <Route path="/register"
                       element={<RegisterationForm register={register} />}/>
                <Route path="/login"
                       element={<LoginForm login = {login} />} />
            </Routes>
        </div>
    )
}

export default AllRoutes;
