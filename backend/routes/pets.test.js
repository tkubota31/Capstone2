"use strict";
process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../app");
const axios = require("axios")

jest.mock('axios');




// const mock = jest.fn(()=>)
// jest.fn(getAccessToken)

// getAccessToken.mockImplementation(()=>{ })


const { commonBeforeAll, commonAfterAll, commonAfterEach, commonBeforeEach } = require("./_testCommon")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// GET PETS
describe("GET /pets/favorite/:username", function () {
    test("get pet when favorited", async function () {
        const response = await request(app).get(`/pets/favorite/testuser`);
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            result: [{
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
            }]
        })
    })
})

//DELETE PET
describe("DELETE /pets/favorite/:id/:username", function () {
    test("delete pet based on id and username", async function () {
        const response = await request(app).delete(`/pets/favorite/1/testuser`)
        expect(response.body).toEqual({ msg: "Deleted" })
    })
})



//getting info on sinple type to extract specific info
describe("GET /pets/onetype/:type", function () {
    test("get info on single animal type", async function () {
        axios.get.mockResolvedValue(
            {
                data: {
                    type: {
                        name: "Dog",
                        coats: [
                            "Hairless",
                            "Short",
                            "Medium",
                            "Long",
                            "Wire",
                            "Curly"
                        ],
                        colors: [
                            "Apricot / Beige",
                            "Bicolor",
                            "Black",
                            "Brindle",
                            "Brown / Chocolate",
                            "Golden",
                            "Gray / Blue / Silver",
                            "Harlequin",
                            "Merle (Blue)",
                            "Merle (Red)",
                            "Red / Chestnut / Orange",
                            "Sable",
                            "Tricolor (Brown, Black, & White)",
                            "White / Cream",
                            "Yellow / Tan / Blond / Fawn"
                        ],
                        genders: [
                            "Male",
                            "Female"
                        ],
                        _links: {
                            self: {
                                href: "/v2/types/dog"
                            },
                            breeds: {
                                href: "/v2/types/dog/breeds"
                            }
                        }
                    }
                }
            }
        )
        const response = await request(app).get('/pets/onetype/dog')
        expect(response.statusCode).toEqual(200);
        expect(response._body.type.name).toBe("Dog")
    })
})

describe("GET /pets/types", function () {
    test("get all pet types", async function () {
        axios.get.mockResolvedValue(
            {
                data: {
                    "types": [
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
                        },
                        {
                            "name": "Bird",
                            "coats": [],
                            "colors": [
                                "Black",
                                "Blue",
                                "Brown",
                                "Buff",
                                "Gray",
                                "Green",
                                "Olive",
                                "Orange",
                                "Pink",
                                "Purple / Violet",
                                "Red",
                                "Rust / Rufous",
                                "Tan",
                                "White",
                                "Yellow"
                            ],
                            "genders": [
                                "Male",
                                "Female",
                                "Unknown"
                            ],
                            "_links": {
                                "self": {
                                    "href": "/v2/types/bird"
                                },
                                "breeds": {
                                    "href": "/v2/types/bird/breeds"
                                }
                            }
                        }
                    ]
                }
            }
        )
        const response = await request(app).get("/pets/types")
        expect(response.statusCode).toEqual(200)
        expect(response._body[0].name).toEqual("Rabbit")
        expect(response._body[1].name).toEqual("Bird")

    })
})

//make sure post requests work
describe("POST pets/test", function () {
    test("testing post route", async function () {
        const response = await request(app).post("/pets/test")
        expect(response.statusCode).toEqual(201)
        expect(response._body).toEqual({
            Dog: "Lucky",
            Cat: "Kaia"
        })
    })
})

// CREATE PETS
describe("POST /pets/favorite/:id/:username", function () {
    test("create pet when favorited", async function () {
        axios.get.mockResolvedValue({
            data: {
                animal: {
                    id: 123,
                    name: "testPet",
                    type: "testType",
                    breeds: {
                        primary: "testBreed"
                    },
                    gender: "testGender",
                    age: "testAge",
                    attributes: {
                        spayed_neutered: true,
                    },
                    colors: {
                        primary: "testColor"
                    },
                    description: "testDescription",
                    contact: {
                        address: {
                            state: "testLocation"
                        }
                    },
                    primary_photo_cropped: {
                        full: "testUrl.img"
                    },
                    organization_id: "testOrg"
                },
                user_username: "testuser"
            }
        })
        const response = await request(app)
            .post('/pets/favorite/123/testuser')
            .send({})
        expect(response.statusCode).toEqual(201);
        expect(response._body).toEqual({
            data: {
                pet_id: 123,
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
                organization_id: "testOrg",
                user_username: "testuser"
            }
        });
    })

    test("fail at creating pet when favorited due to id type", async function () {
        axios.get.mockResolvedValue({
            data: {
                animal: {
                    id: "123",
                    name: "testPet",
                    type: "testType",
                    breeds: {
                        primary: "testBreed"
                    },
                    gender: "testGender",
                    age: "testAge",
                    attributes: {
                        spayed_neutered: true,
                    },
                    colors: {
                        primary: "testColor"
                    },
                    description: "testDescription",
                    contact: {
                        address: {
                            state: "testLocation"
                        }
                    },
                    primary_photo_cropped: {
                        full: "testUrl.img"
                    },
                    organization_id: "testOrg"
                },
                user_username: "testuser"
            }
        })
        const response = await request(app)
            .post('/pets/favorite/123/testuser')
            .send({})
        expect(response.statusCode).toEqual(400);
    })
})

describe("GET /pets/breeds/:type", function () {
    test("get all breeds of certain type", async function () {
        axios.get.mockResolvedValue(
            {
                data: {
                    "breeds": [
                        {
                            "name": "Affenpinscher",
                            "_links": {
                                "type": {
                                    "href": "/v2/types/dog"
                                }
                            }
                        }
                    ]
                }
            })
        const response = await request(app).get('/pets/breeds/dog')
        expect(response.statusCode).toEqual(200)
        expect(response._body.breeds[0].name).toEqual("Affenpinscher")
    })
})

describe("GET /pets/company/:orgId", function () {
    test("get info about specific company", async function () {
        axios.get.mockResolvedValue(
            {
                data: {
                    "organization": {
                        "id": "NJ333",
                        "name": "NJ333 - Petfinder Test Account",
                        "email": "no-reply@petfinder.com",
                        "phone": "555-555-5555",
                        "address": {
                            "address1": "Test address 1",
                            "address2": "Test address 2",
                            "city": "Jersey City",
                            "state": "NJ",
                            "postcode": "07097",
                            "country": "US"
                        },
                        "hours": {
                            "monday": null,
                            "tuesday": null,
                            "wednesday": null,
                            "thursday": null,
                            "friday": null,
                            "saturday": null,
                            "sunday": null
                        },
                        "url": "https://www.petfinder.com/member/us/nj/jersey-city/nj333-petfinder-test-account/?referrer_id=d7e3700b-2e07-11e9-b3f3-0800275f82b1",
                        "website": null,
                        "mission_statement": null,
                        "adoption": {
                            "policy": null,
                            "url": null
                        },
                        "social_media": {
                            "facebook": null,
                            "twitter": null,
                            "youtube": null,
                            "instagram": null,
                            "pinterest": null
                        },
                        "photos": [
                            {
                                "small": "https://photos.petfinder.com/photos/organizations/124/1/?bust=1546042081&width=100",
                                "medium": "https://photos.petfinder.com/photos/organizations/124/1/?bust=1546042081&width=300",
                                "large": "https://photos.petfinder.com/photos/organizations/124/1/?bust=1546042081&width=600",
                                "full": "https://photos.petfinder.com/photos/organizations/124/1/?bust=1546042081"
                            }
                        ],
                        "distance": null,
                        "_links": {
                            "self": {
                                "href": "/v2/organizations/nj333"
                            },
                            "animals": {
                                "href": "/v2/animals?organization=nj333"
                            }
                        }
                    }
                }
            }
        )
        const response = await request(app).get("/pets/company/NJ333")
        console.log(response._body)
        expect(response.statusCode).toEqual(200)
        expect(response._body.organization.name).toEqual("NJ333 - Petfinder Test Account")
    })
})
