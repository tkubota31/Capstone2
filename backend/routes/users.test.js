"use strict";
process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../app");


const { commonBeforeAll, commonAfterAll, commonAfterEach, commonBeforeEach } = require("./_testCommon")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("POST /users/register", function () {
    test("create new user, return everything but password", async function () {
        const response = await request(app)
            .post("/users/register")
            .send({
                username: "newTestUser",
                password: "newTestPass",
                firstName: "newTestFirst",
                lastName: "newTestLast",
                email: "newTest@email.com"
            })
        expect(response.statusCode).toEqual(201)
        expect(response.body.user).toEqual({
            username: "newTestUser",
            firstName: "newTestFirst",
            lastName: "newTestLast",
            email: "newTest@email.com"
        })
    })
})


describe("GET /users/:username", function () {
    test("get a specific user with their username", async function () {
        const response = await request(app)
            .get("/users/testuser")
        expect(response.statusCode).toEqual(200)
    })
    test("throw error if user if not found", async function(){
        const response= await request(app)
            .get("/users/badusername")
        expect(response.statusCode).toEqual(404)
    })
})

describe("DELETE /users/:username/delete", function(){
    test("delete user with username", async function(){
        const response= await request(app)
            .get("/users/testuser/delete")
        expect(response._body).toEqual({deleted: "testuser"})
    })
})
