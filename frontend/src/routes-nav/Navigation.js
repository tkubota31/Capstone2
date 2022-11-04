import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import UserContext from "../auth/UserContext";
import {Container, Nav, Navbar} from "react-bootstrap"
import Kaia from "../images/kaia.jpg"

function Navigation({logout}){
    const {currentUser} = useContext(UserContext);

    function loggedInNavBar(){
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src= {Kaia}
                                width="30"
                                height="30"
                                className="d-inline-block align top"
                            />{' '}
                            Pet Furend
                        </Navbar.Brand>
                        <Nav className= "me-auto">
                            <Nav.Link href="/"> Homepage </Nav.Link>
                            <Nav.Link href="/favorites"> Favorites </Nav.Link>
                            <Nav.Link href="/profile"> Profile </Nav.Link>
                            <Nav.Link href="/" onClick={() => logout()}> Log out {currentUser.first_name || currentUser.username}</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
            // <ul>
            //     <li>
            //         <NavLink to="/">
            //             Homepage
            //         </NavLink>
            //     </li>
            //     <li>
            //         <NavLink to="/favorites">
            //             Favorites
            //         </NavLink>
            //     </li>
            //     <li>
            //         <NavLink to="/profile">
            //             Profile
            //         </NavLink>
            //     </li>
            //     <li>
            //         <Link to="/" onClick={logout}>
            //             Log out {currentUser.first_name || currentUser.username}
            //         </Link>
            //     </li>
            // </ul>


    function loggedOutNavBar(){
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src= {Kaia}
                                width="30"
                                height="30"
                                className="d-inline-block align top"
                            />{' '}
                            Pet Furend
                        </Navbar.Brand>
                        <Nav className= "me-auto">
                            <Nav.Link href="/" > Homepage </Nav.Link>
                            <Nav.Link href="/login"> Login </Nav.Link>
                            <Nav.Link href="/register"> Register </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>

        )
        //using react components, not bootstrap
            // <ul>
            //     <li>
            //         <NavLink to="/">
            //             Homepage
            //         </NavLink>
            //     </li>
            //     <li>
            //         <NavLink to="/login">
            //             Login
            //         </NavLink>
            //     </li>
            //     <li>
            //         <NavLink to="/register">
            //             Register
            //         </NavLink>
            //     </li>
            // </ul>
        // );
    }

    return (
        <nav>
            {currentUser ? loggedInNavBar() : loggedOutNavBar()}
        </nav>
    );
}

export default Navigation;
