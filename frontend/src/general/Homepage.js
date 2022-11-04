import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../auth/UserContext";
import Slider from "./Slider"
import "../css/Homepage.css"

function Homepage(){
    const{ currentUser } = useContext(UserContext);


    return (
        <div>
            <Slider/>
            <div className="Homepage">
                <div className="container text-center">
                <h1 className= "md-4 font-weight-bold">Pet Furend</h1>
                <p className="lead"> Meet your best furend today!</p>
                {currentUser
                    ? <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    : (
                        <p className="HomepageLink">
                            <Link className="btn btn-info font-weight-bold btn-lg" to="/login">
                            Log in
                            </Link> {" "}
                            <Link className="btn btn-info font-weight-bold flex-row btn-lg" to="/register">
                            Register
                            </Link>
                        </p>
                )}
                </div>
            </div>

        </div>
    )
}

export default Homepage
