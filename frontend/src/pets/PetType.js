import React, {useState, useEffect} from "react";
import PetApi from "../api";
import LoadingPage from "../general/LoadingPage";
import PetSearch from "./PetType"


function PetType(){
    const[types, setTypes] = useState([]);

    useEffect(() =>{
        getAllPetTypes()
    },[]);

    async function getAllPetTypes(){
        let allTypes = await PetApi.allPetTypes()
        setTypes(allTypes)
    }

    if(!types) return <LoadingPage />

    console.log(types)
   return (
    <div>
        {types.map(type =>(
            <div>
                <h2>{type.name}</h2>
                <PetSearch
                    key={type.name}
                    type={type.name} />
            </div>
        ))}
    </div>
   )
}

export default PetType
