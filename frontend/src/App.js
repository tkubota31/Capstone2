import React, {useState, useEffect} from "react"
import {BrowserRouter} from "react-router-dom"
import PetApi from "./api";
import Routes from "./routes-nav/Routes"
import UserContext from "./auth/UserContext";
import LoadingPage from "./general/LoadingPage"
import Navigation from "./routes-nav/Navigation"
import jwt from "jwt-decode"
import PetSearch from "./pets/PetSearch";
import PetType from "./pets/PetType"
import FilterForm from "./general/FilterForm"
import PetCard from "./pets/PetCard"

function App() {
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [favoritedPetsId, setFavoritedPetsId] = useState(new Set([]));

  useEffect(function loadUserInfo(){

    async function getCurrentUser(){
      if(token){
        try{
          let{username} = jwt.decode(token);

          //put token on pet api class
          PetApi.token = token;
          let currentUser = await PetApi.getCurrentUser(username);
          setCurrentUser(currentUser)
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

    function logout(){
      setCurrentUser(null);
      setToken(null);
    }

    function hasFavoritedPet(id){
      return favoritedPetsId.has(id)
    }

    function favoritePet(id){
      if(hasFavoritedPet(id)) return;
      PetApi.favPet(id);
      setFavoritedPetsId(new Set([...favoritedPetsId,id]))
    }


    if(!infoLoaded){
      return <LoadingPage />;
    }
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{currentUser, setCurrentUser, favoritePet, hasFavoritedPet}}>

          <div>
            <Navigation logout ={logout} />
            <Routes register = {register} login = {login} />
          </div>
          <PetCard />
      {/* <PetSearch /> */}
      {/* <PetType />
      <FilterForm /> */}
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
