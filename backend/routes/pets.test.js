"use strict";

const request = require("supertest")
const app = require("../app");
const Pet = require("../models/pets");


const{commonBeforeAll} = require("./_testCommon")

beforeAll(commonBeforeAll);

console.log("UNCHH")
//test

function rollDice(numSides) {
    return Math.floor(Math.random() * numSides);
  }

describe("#rollDice", function() {
    Math.random = jest.fn(() => 0.5);

    test("it rolls the correct amount of dice", function() {
      expect(rollDice(6)).toEqual(3);
      expect(Math.random).toHaveBeenCalled();

      expect(rollDice(2)).toEqual(1);
      expect(Math.random).toHaveBeenCalled();
    });
  });

//GET PETS

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


//CREATE PETS
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
