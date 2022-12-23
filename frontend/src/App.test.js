import React from "react"
import { render } from '@testing-library/react';
import App from "./App"

describe("Render App component", function(){
  test("Does App render correctly", function(){
    render(<App />)
  })
})
