import React from "react"
import {Routes,Route,Navigate} from "react-router-dom"
import RegisterationForm from "../auth/RegisterationForm"
import LoginForm from "../auth/LoginForm"
import Homepage from "../general/Homepage"
import SecuredRoute from "./SecuredRoute"
import PetType from "../pets/PetType"
import PetFavorites from "../pets/PetFavorites"
import CompanyDetail from "../company/CompanyDetail"

function AllRoutes({login, register}){

    return(
        <div>
            <Routes>
                <Route path="/"
                       element = {<Homepage/>} />
                <Route path="/register"
                       element={<RegisterationForm register={register} />}/>
                <Route path="/login"
                       element={<LoginForm login = {login} />} />
                <Route path="/pets"
                       element = {<PetType/>} />
                <Route path="/favorites"
                       element= {<PetFavorites />} />
                <Route path="/company/:orgId"
                       element= {<CompanyDetail />} />
                <Route path ="/"
                       element={<Navigate to="/"/>} />
            </Routes>
        </div>
    )
}

export default AllRoutes;
