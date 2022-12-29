"use strict";
process.env.NODE_ENV = "test"

import React from "react"
import { render, waitFor, screen } from '@testing-library/react';
import PetCard from "./PetCard"
import PetApi from "../api";
import LoadingPage from "../general/LoadingPage"
import {UserProvider} from "../testUtils"

jest.mock("../api");


describe("PetCard Component", function (){
    beforeEach(() => jest.clearAllMocks())
    test("Load component", async function(){
        let card = {
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
            organization_id: "testOrgId"
        }

        render(<PetCard card={card} />)

        await waitFor(() =>{
            screen.getByText("testName")
        })

    })
})
