const request = require("supertest");

const app = require("../app")


//Create beforeEach and afterEach functions too

//format for get request
describe("", () =>{
    test("", async () =>{
    const res = await request(app).get("/dogs");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({})
    })
})

//format for post request
describe("", () =>{
    test("", async () =>{
    const res = await request(app).post("/dogs").send({})
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({})
    })
})


//format for patch request
describe("", () =>{
    test("", async () =>{
    const res = await (await request(app).patch(`/dogs/${dogID}`)).send({});
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({})
    })
})

//format for delete request
describe("", () =>{
    test("", async () =>{
    const res = await (await request(app).delete(`/dogs/${dogID}`))
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({})
    })
})
