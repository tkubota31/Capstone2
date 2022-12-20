const request = require("supertest")
const app = require("../app");
const db = require("../db")
const Pet = require("../models/pets");
const User = require("../models/users")
const axios = require("axios")

jest.mock('axios');


async function commonBeforeAll(){

    await db.query("DELETE FROM users");

    await db.query("DELETE FROM pets");

    await User.register(
        {
            username : "testuser",
            password: "testpassword",
            firstName: "testfirst",
            lastName: "testlast",
            email: "test@gmail.com"
        }
    );

    await Pet.create(
        {
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
            organization_id: "123456",
            user_username: "testuser"
        }
    );

    // axios.post.mockResolvedValue();
}

async function commonBeforeEach() {
    // axios.post.mockResolvedValue()
    await db.query("BEGIN");
  }

async function commonAfterEach() {
    await db.query("ROLLBACK");
  }
async function commonAfterAll() {
    await db.end();
  }



module.exports ={
    commonBeforeAll,
    commonAfterAll,
    commonBeforeEach,
    commonAfterEach
}
