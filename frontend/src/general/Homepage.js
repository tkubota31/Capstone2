import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../auth/UserContext";


function Homepage(){
    const{ currentUser } = useContext(UserContext);

    return (
        <div>
            <h1>Pet Furend</h1>
            <p> Meet your best furend today!</p>
            {currentUser
                ? <h2>
                    Welcome Back, {currentUser.firstName || currentUser.username}!
                </h2>
                : (
                    <p>
                        <Link to="/login">
                        Log in
                        </Link>
                        <Link to="/signup">
                        Register
                        </Link>
                    </p>
                )}
        </div>
    )
}

export default Homepage
