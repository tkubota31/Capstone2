"use strict";
process.env.NODE_ENV = "test"

import React from "react"
import { render,fireEvent, waitFor, screen } from '@testing-library/react';
import PetType from "./PetType"
import PetApi from "../api";
import LoadingPage from "../general/LoadingPage"
import PetSearch from "./PetSearch"
import PetCard from "./PetCard"
import PetCardList from "./PetCardList"
import {UserProvider} from "../testUtils"

jest.mock("../api");


describe("PetType component", function(){
    beforeEach(() => jest.clearAllMocks())

    test("make api calls", async () =>{
        PetApi.allPetTypes.mockResolvedValue([
            {
                "name": "Rabbit",
                "coats": [
                    "Short",
                    "Long"
                ],
                "colors": [
                    "Agouti",
                    "Black",
                    "Blue / Gray",
                    "Brown / Chocolate",
                    "Cream",
                    "Lilac",
                    "Orange / Red",
                    "Sable",
                    "Silver Marten",
                    "Tan",
                    "Tortoiseshell",
                    "White"
                ],
                "genders": [
                    "Male",
                    "Female"
                ],
                "_links": {
                    "self": {
                        "href": "/v2/types/rabbit"
                    },
                    "breeds": {
                        "href": "/v2/types/rabbit/breeds"
                    }
                }
            }
        ])
        render(<PetType />)
        expect(PetApi.allPetTypes).toHaveBeenCalledTimes(1)
        await waitFor(() =>{
            screen.getByText("Rabbit")
        })
    })

    test("Load loading screen when failed", async () =>{
        PetApi.allPetTypes.mockRejectedValue({});
        render(<LoadingPage />)
        expect(PetApi.allPetTypes).toHaveBeenCalledTimes(0);
        await waitFor(()=>{
            screen.getByText("Loading...")
        })
    })

    test("render PetSearch component", async () =>{
        render(<PetSearch/>)
        await waitFor(() =>{
            screen.getByText("Search")
        })
    })

    // test("render PetCardList component", async () =>{
    //     let pets = [
    //         {
    //         id: 123,
    //         name: "testName",
    //         type: "Cat",
    //         breeds: {
    //             primary: " American Shorthair"
    //         },
    //         gender: "Female",
    //         age: "Young",
    //         attributes:{
    //                 spayed_neutered: true,
    //             },
    //         colors:{
    //             primary:"Tortoiseshell"
    //         },
    //         description: "test description",
    //         contact:{
    //             address:{
    //                 state:"MA"
    //             }
    //         },
    //         primary_photo_cropped: "test@url.com",
    //         organization_id: "testOrgId"
    //         }
    //     ];
    //     render(<PetCardList pets={pets}/>)
    //     await waitFor(() =>{
    //         screen.getByText("No results found")
    //     })
    // })

    // test("render PetCard component", async () =>{
    //     console.log("HELOLL")
    //     // let currentUser = "testUser"
    //     PetApi.getAllFavPets.mockResolvedValue([{
    //         id: 123,
    //         name: "testName",
    //         type: "Cat",
    //         breed: " American Shorthair",
    //         gender: "Female",
    //         age: "Young",
    //         spayed_neutered: true,
    //         color: "Tortoiseshell",
    //         description: "test description",
    //         locaion: "MA",
    //         image_url: "test@url.com",
    //         organization_id: "testOrgId",
    //         user_username: "testUser"
    //     }])
    //     // render(<UserProvider>
    //     //             <PetCard/>
    //     //         </UserProvider>)
    //     // const submitBtn = screen.getByText("Search")
    //     // fireEvent.click(submitBtn)
    //     render(<PetCard />)
    //     await waitFor(() =>{
    //         screen.getByText("Organization")
    //     })
    // })
})


// PetApi.petTypeInfo.mockResolvedValue({
    //         "type": {
    //             "name": "Dog",
    //             "coats": [
    //                 "Hairless",
    //                 "Short",
    //                 "Medium",
    //                 "Long",
    //                 "Wire",
    //                 "Curly"
    //             ],
    //             "colors": [
    //                 "Apricot / Beige",
    //                 "Bicolor",
    //                 "Black",
    //                 "Brindle",
    //                 "Brown / Chocolate",
    //                 "Golden",
    //                 "Gray / Blue / Silver",
    //                 "Harlequin",
    //                 "Merle (Blue)",
    //                 "Merle (Red)",
    //                 "Red / Chestnut / Orange",
    //                 "Sable",
    //                 "Tricolor (Brown, Black, & White)",
    //                 "White / Cream",
    //                 "Yellow / Tan / Blond / Fawn"
    //             ],
    //             "genders": [
    //                 "Male",
    //                 "Female"
    //             ],
    //             "_links": {
    //                 "self": {
    //                     "href": "/v2/types/dog"
    //                 },
    //                 "breeds": {
    //                     "href": "/v2/types/dog/breeds"
    //                 }
    //             }
    //         }
    //    })
