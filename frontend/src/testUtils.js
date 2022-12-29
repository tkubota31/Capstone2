import React from "react";
import UserContext from "./auth/UserContext"

const demoUser = "taiohTest"
const favPet = {
             id: 123,
            name: "testName",
            type: "Cat",
            breed: " American Shorthair",
            gender: "Female",
            age: "Young",
            spayed_neutered: true,
            color: "Tortoiseshell",
            description: "test description",
            locaion: "MA",
            image_url: "test@url.com",
            organization_id: "testOrgId",
            user_username: "testUser"
}
const UserProvider =
    ({children, currentUser = demoUser}) =>(
        <UserContext.Provider value = {{currentUser, favPet}}>
            {children}
        </UserContext.Provider>
    );

    export {UserProvider};
