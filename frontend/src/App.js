import React, {useState, useEffect} from "react"
import PetApi from "./api";

function App() {
  cibst [token, setToken] = useLocalStorate(null)

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

  return (
    <div className="App">

    </div>
  );
}

export default App;
