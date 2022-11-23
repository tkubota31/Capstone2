const request = require("supertest")
const app = require("../app");
const Pet = require("../models/pets");
const Pets = require("../models/pets");


beforeEach(async function(){
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
            image_url: "https://th.bing.com/th/id/OIP.AuW4_cIv0KkGxiaebBD0ggHaJ4?pid=ImgDet&w=191&h=254&c=7&dpr=2.5",
            organization_id: 123456,
            user_username: "taiohk31"
        }
    )
})

describe("GET /pets/favorite/:username", function (){
    test("get pet when favorited", async function (){
        const response = await request(app).get(`/pets/favorite/taiohk31`);
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
            image_url: "https://th.bing.com/th/id/OIP.AuW4_cIv0KkGxiaebBD0ggHaJ4?pid=ImgDet&w=191&h=254&c=7&dpr=2.5",
            organization_id: 123456,
            user_username: "taiohk31"
        }]
        })
    })
})

// afterEach(function(){

// })
