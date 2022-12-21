"use strict";

const db = require("../db.js");
const Pet = require("./pets.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

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
