import React from "react";
import UserContext from "./auth/UserContext"

const demoUser = "taiohTest"

const UserProvider =
    ({children, currentUser = demoUser}) =>(
        <UserContext.Provider value = {{currentUser}}>
            {children}
        </UserContext.Provider>
    );

    export {UserProvider};
