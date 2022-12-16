"use strict";

process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../app");
const Pet = require("../models/pets");


const{commonBeforeAll} = require("./_testCommon")

beforeAll(commonBeforeAll);


// GET PETS

describe("GET /pets/favorite/:username", async function (){
    test("get pet when favorited", async function (){
        const response = await request(app).get(`/pets/favorite/testuser`);
        expect(response.body).toEqual({
         result:[ {
            pet_id: "1",
            name: "Lucky",
            type: "Dog",
            breed: "cockapoo",
            gender: "Male",
            age: "Adult",
            spayed_neutered: false,
            color: "brown",
            description: "cute dog",
            location: "MA",
            image_url: "https://pet.img",
            organization_id: 123456,
            user_username: "testuser"
        }]
        })
    })
})


// CREATE PETS
// describe("POST /pets/favorite/:id/:username", async function(){
//     test("create pet when favorited", async function(){
//         const response = await request(app)
//             .post(`/pets/favorite/123/testuser`)
//             .send({
//                 pet_id: "000",
//                 name: "testPet",
//                 type: "testType",
//                 breed: "testBreed",
//                 gender: "testGender",
//                 age: "testAge",
//                 spayed_neutered: true,
//                 color: "testColor",
//                 description: "testDescription",
//                 location: "testLocation",
//                 image_url: "testUrl.img",
//                 organizationg_id: "testOrg",
//                 user_username: "testuser"
//             })
//         expect(response.body).toEqual({
//             pet_id: "000",
//                 name: "testPet",
//                 type: "testType",
//                 breed: "testBreed",
//                 gender: "testGender",
//                 age: "testAge",
//                 spayed_neutered: true,
//                 color: "testColor",
//                 description: "testDescription",
//                 location: "testLocation",
//                 image_url: "testUrl.img",
//                 organizationg_id: "testOrg",
//                 user_username: "testuser"
//         });
//         expect(response.statusCode).toEqual(201);

//     })
// } )

// afterEach(function(){

// })
