"use strict";
process.env.NODE_ENV = "test"

import React from "react"
import { render, waitFor, screen } from '@testing-library/react';
import PetType from "./PetType"
import PetApi from "../api";
import LoadingPage from "../general/LoadingPage"

jest.mock("../api");


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

    test("Error when api fails", async () =>{
        PetApi.allPetTypes.mockRejectedValue({});
        render(<LoadingPage />)
        expect(PetApi.allPetTypes).toHaveBeenCalledTimes(0);
        await waitFor(()=>{
            screen.getByText("Loading...")
        })
    })
})
