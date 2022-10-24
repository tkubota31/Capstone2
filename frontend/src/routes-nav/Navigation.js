import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import UserContext from "../auth/UserContext";


function Navigation({logout}){
    const {currentUser} = useContext(UserContext);

    function loggedInNavBar(){
        return (
            <ul>
                <li>
                    <NavLink to="/homepage">
                        Homepage
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/favorites">
                        Favorites
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li>
                    <Link to="/" onClick={logout}>
                        Log out {currentUser.first_name || currentUser.username}
                    </Link>
                </li>
            </ul>
        )
    }


    function loggedOutNavBar(){
        return (
            <ul>
                <li>
                    <NavLink to="/homepage">
                        Homepage
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register">
                        Register
                    </NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav>
            {currentUser ? loggedInNavBar() : loggedOutNavBar()}
        </nav>
    );
}

export default Navigation;
