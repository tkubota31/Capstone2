import React from "react"
import { render } from '@testing-library/react';
// import PetCard from "./PetCard"
import Homepage from "../general/Homepage"

describe("PetCard component", function(){

    test("should match snapshot", async function (){
       const {asFragment } =  render(<Homepage/>)
       expect(asFragment()).toMatchSnapshot();

})

// test("testing queries", function(){
//     const {getByTest} = render(<PetCard />)
//     getByTest("Pet Type")
// })

})
