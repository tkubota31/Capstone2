const {square} = require("./square")

test("square should square a number", function (){
    const res = square(3)
    expect(res).toEqual(9)
})
