const request = require("supertest")
const app = require("../app");
const Pet = require("../models/pets");


const{commonBeforeAll} = require("./_testCommon")

beforeAll(commonBeforeAll);


//GET PETS

describe("GET /pets/favorite/:username", async function (){
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


//CREATE PETS
describe("POST /pets/favorite/:id/:username", async function(){
    test("create pet when favorited", async function(){
        const response = await request(app)
            .post(`/pets/favorite/123/testuser`)
            .send({
                pet_id: "000",
                name: "testPet",
                type: "testType",
                breed: "testBreed",
                gender: "testGender",
                age: "testAge",
                spayed_neutered: true,
                color: "testColor",
                description: "testDescription",
                location: "testLocation",
                image_url: "testUrl.img",
                organizationg_id: "testOrg",
                user_username: "testuser"
            })
        expect(response.body).toEqual({
            pet_id: "000",
                name: "testPet",
                type: "testType",
                breed: "testBreed",
                gender: "testGender",
                age: "testAge",
                spayed_neutered: true,
                color: "testColor",
                description: "testDescription",
                location: "testLocation",
                image_url: "testUrl.img",
                organizationg_id: "testOrg",
                user_username: "testuser"
        });
        expect(response.statusCode).toEqual(201);

    })
} )

// afterEach(function(){

// })
