import React, {useState, useEffect} from "react"
import {BrowserRouter} from "react-router-dom"
import PetApi from "./api";
import Routes from "./routes-nav/Routes"
import UserContext from "./auth/UserContext";
import LoadingPage from "./general/LoadingPage"
import Navigation from "./routes-nav/Navigation"


function App() {
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

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


    if(!infoLoaded){
      return <LoadingPage />;
    }
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{currentUser, setCurrentUser}}>

          <div>
            <Navigation logout ={logout} />
            <Routes register = {register} login = {login} />
          </div>

      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
