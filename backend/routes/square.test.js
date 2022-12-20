const db = require("../db");
const {square} = require("./square")

const{commonBeforeAll, commonAfterAll} = require("./_testCommon")

beforeAll(commonBeforeAll);
afterAll(commonAfterAll);

test("square should square a number", function (){
    const res = square(3)
    expect(res).toEqual(9)
})
