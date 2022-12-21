"use strict";

const db = require("../db.js");
const Pet = require("./pets.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

const ExpressError = require("../expressError")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Create", function(){
    const newPet = {
        pet_id: "newId",
        name: "newName",
        type: "newType",
        breed: "newBreed",
        gender: "newGender",
        age: "newAge",
        spayed_neutered: false,
        color: "newColor",
        description:" new description",
        location: "new location",
        image_url: "newImageUrl",
        organization_id: "newOrgId",
        user_username: "newUserName"
    }
    test("If new pet can be made", async function(){
        let pet = await Pet.create(newPet);
        expect(pet).toEqual(newPet)
    })
})

describe("Get Pet", function(){
    test("Get pet using ID", async function(){
        let pet = await Pet.getPet("pet_id1")
        expect(pet).toEqual({
            pet_id: 'pet_id1',
            name: 'testName',
            type: 'testType',
            breed: 'testBreed',
            gender: 'testGender',
            age: 'testAge',
            spayed_neutered: true,
            color: 'testColor',
            description: 'testDescription',
            location: 'testLocation',
            image_url: 'testImage_url',
            organization_id: 'testOrgId',
            user_username: 'test_user_username'
          }
      )
    })

    test("throw error if pet does not exist", async function(){
        try{
        await Pet.getPet("fakeId")
        }catch(e){
            expect(e.status).toEqual(404)
            expect(e instanceof ExpressError).toBeTruthy()

        }

    })
})


describe("Get all favorited pets", function(){
    test("get all favorited pets based on username", async function(){
        let pet = await Pet.getAllFavPet("test_user_username")
        expect(pet[0]).toEqual({
            pet_id: 'pet_id1',
            name: 'testName',
            type: 'testType',
            breed: 'testBreed',
            gender: 'testGender',
            age: 'testAge',
            spayed_neutered: true,
            color: 'testColor',
            description: 'testDescription',
            location: 'testLocation',
            image_url: 'testImage_url',
            organization_id: 'testOrgId',
            user_username: 'test_user_username'
          })
    })

    test("throw error if there are no favorited pets", async function(){
        try{
            await Pet.getAllFavPet("fake username")
        }catch(e){
            expect(e instanceof ExpressError).toBeTruthy()
        }
    })
})


describe("Delete Pet", function(){
    test("delete pet with id and username", async function(){
        await Pet.delete("pet_id1","test_user_username")
        let response = await db.query(
        "SELECT pet_id FROM pets WHERE pet_id = 'pet_id1' AND user_username = 'test_user_username'");
        expect(response.rows.length).toEqual(0);
    });

    test("Throw error if not found", async function(){
        try{
            await Pet.delete("fake_id","fake_username")
        }catch(e){
            expect(e instanceof ExpressError).toBeTruthy()
            expect(e.status).toEqual(404)
        }
    })
})
