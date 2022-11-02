import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../auth/UserContext";
import Slider from "./Slider"

function Homepage(){
    const{ currentUser } = useContext(UserContext);

    return (
        <div>
            <Slider/>
            <h1>Pet Furend</h1>
            <p> Meet your best furend today!</p>
            {currentUser
                ? <h2>
                    Welcome Back, {currentUser.firstName || currentUser.username}!
                </h2>
                : (
                <div>
                    <div>
                        <Link className="btn btn-warning btn-lg" to="/login">
                        Log in
                        </Link>
                    </div>
                    <div>
                        <Link className="btn btn-warning btn-lg" to="/signup">
                        Register
                        </Link>
                    </div>
                </div>
                )}
        </div>
    )
}

export default Homepage
