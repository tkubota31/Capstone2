"use strict";
process.env.NODE_ENV = "test"

import React from "react"
import {BrowserRouter} from "react-router-dom"
import { render, waitFor, screen } from '@testing-library/react';
import PetCard from "./PetCard"
import PetType from "./PetType"
import PetApi from "../api";
import {UserProvider} from "../testUtils"

jest.mock("../api");

let demoUser = "testTaioh"

describe("PetCard component", function(){
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

    // test("should match snapshot", async function (){
    //    const {asFragment } =  render(<Homepage/>)
    //    expect(asFragment()).toMatchSnapshot();

// })

// test("testing queries", function(){
//     const {getByTest} = render(<PetCard />)
//     getByTest("Pet Type")
// })

// })

    // test("Matches snapshot", function (){
    //     let testCard = {
    //         id: "testId",
    //         name: "testName",
    //         type: "testType",
    //         breed: "testBreed",
    //         gender: "testGender",
    //         age: "testAge",
    //         spayed_neutered: "testSpayed",
    //         color:"testColor",
    //         description: "testDescription",
    //         location: "testLocation",
    //         image_url: "testUrl",
    //         organization_id: "testOrg"
    //     }

    //     const { asFragment } = render(
    //     <BrowserRouter>
    //         <UserProvider>
    //             <PetCard testCard= {testCard}/>
    //         </UserProvider>
    //     </BrowserRouter>
    //     )

    //     expect(asFragment()).toMatchSnapshot();
    // })
})
