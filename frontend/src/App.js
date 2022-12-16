import React, {useState, useEffect} from "react"
import {BrowserRouter} from "react-router-dom"
import PetApi from "./api";
import Routes from "./routes-nav/Routes"
import UserContext from "./auth/UserContext";
import LoadingPage from "./general/LoadingPage"
import Navigation from "./routes-nav/Navigation"
import jwt_decode from "jwt-decode"


function App() {
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [favoritedPetsId, setFavoritedPetsId] = useState(new Set([]));

  useEffect(function loadUserInfo(){

    async function getCurrentUser(){
      console.log(localStorage.getItem("token"))
      if(localStorage.getItem("token")){
        try{
          let{username} = jwt_decode(localStorage.getItem("token"));

          //put token on pet api class
          // PetApi.token = token;
          // let currentUser = await PetApi.getCurrentUser(username);
          setCurrentUser(username)
          console.log(`CURRENT USER ${currentUser}`)
        }catch(e){
          console.log(e)
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true);
    }
    //use infoloaded state to determine showing loading page or not
    setInfoLoaded(false);
    getCurrentUser()
  }, [token]);


    async function register(data){
      try{
        let token = await PetApi.register(data);
        localStorage.setItem("token", token)
        setToken(token)
        return {success:true};
      }catch(e){
        console.log(e);
        return {success:false, e};
      }
    }

    async function login(data){
      try{
        let token = await PetApi.login(data);
        localStorage.setItem("token",token)
        setToken(token)
        // setToken(token)
        return {success: true};
      }catch(e){
        console.log(e)
      return {success:false, e};
      }
    }

    function logout() {
      setCurrentUser(null);
      localStorage.removeItem("token")
      setToken(null)
    }

    function hasFavoritedPet(id){
      console.log(favoritedPetsId)
      console.log("HAS FAVORITED PET")
      return favoritedPetsId.has(id)
    }

    function favoritePet(id){
      if (hasFavoritedPet(id)) return;
      console.log("favoritePet function here")
      console.log(currentUser,id)
      PetApi.favPet(id,currentUser);
      setFavoritedPetsId(new Set([...favoritedPetsId,id]))
      console.log(favoritedPetsId)
    }

console.log(`CURRENT USER ${currentUser}`)
    if(!infoLoaded){
      return <LoadingPage />;
    }
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{currentUser, setCurrentUser, favoritePet, hasFavoritedPet}}>

          <div>
            <Navigation logout ={logout} />
          </div>

          <div>
            <Routes register = {register} login = {login} />
          </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
