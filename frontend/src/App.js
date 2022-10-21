import React, {useState, useEffect} from "react"
import {BrowserRouter} from "react-router-dom"
import PetApi from "./api";
import Routes from "./routes-nav/Routes"

function App() {
  const [token, setToken] = useState(null)

    async function register(data){
      try{
        let token = await PetApi.register(data);
        setToken(token);
        return {success:true};
      }catch(e){
        console.log(e);
        return {success:false, e};
      }
    }

    async function login(data){
      try{
        let token = await PetApi.login(data);
        setToken(token)
        return {success: true};
      }catch(e){
        console.log(e)
      return {success:false, e};
      }
    }

  return (
    <BrowserRouter>
      <Routes register = {register} login = {login} />
    </BrowserRouter>
  );
}

export default App;
