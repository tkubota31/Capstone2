"use strict";

const db = require("../db.js");
const User = require("./users.js");
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


describe("authenticate user", function () {
  test("Returns user is valid user credentials", async function () {
    const user = await User.authenticate("testUser", "testPassword")
    expect(user.username).toEqual("testUser")
  })

  test("Throws error if invalid username or password", async function () {
    try {
      await User.authenticate("fakeUser", "fakePassword")
    } catch (e) {
      expect(e.status).toEqual(401)
      expect(e instanceof ExpressError).toBeTruthy()
    }
  })
})

describe("Create a new user", function () {
  test("able to make new user", async function () {
    const user = await User.register({
      username: "newUser",
      password: "newPass",
      firstName: "newFirstName",
      lastName: "newLastName",
      email: "new@Email.com"
    })
    expect(user).toEqual({
      username: "newUser",
      firstName: "newFirstName",
      lastName: "newLastName",
      email: "new@Email.com"
    })
    const found = await db.query("SELECT * FROM users WHERE username = 'newUser'");
    expect(found.rows.length).toEqual(1);
  })

  test("Error if duplicate user", async function(){
    try{
      await User.register({
        username: "testUser",
        password: "testPassword",
        firstName: "testFirstName",
        lastName: "testLastName",
        email: "test@Email.com"
      })
    }catch(e){
      expect(e instanceof ExpressError).toBeTruthy()
    }
  })
})
