"use strict";
process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../app");

const { commonBeforeAll, commonAfterAll, commonAfterEach, commonBeforeEach } = require("./_testCommon")

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


describe("POST /auth/login", function(){
    test("Log in with username and password", async function(){
            const response = await request(app)
                .post("/auth/login")
                .send({
                    username: "testuser",
                    password: "testpassword"
                })
                expect(response.statusCode).toEqual(200)
                expect(response._body.message).toEqual("Logged In")
    })
})
