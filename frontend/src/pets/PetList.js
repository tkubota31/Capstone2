import React, {useState, useEffect} from "react";
import PetApi from "../api";
import PetCardList from "./PetCardList";
import LoadingPage from "../general/LoadingPage";


function PetList(){
    const[pets, setPets] = useState(null);

    useEffect(function getAllPetsOnMount(){
        search();
    })

    async function search(breed,gender,age,color,location){
        let pets = await PetApi.petFilter(breed,gender,age,color,location);
        setPets(pets);
    }

    if(!pets) return <LoadingPage/>

    return(
        <div>

        </div>
    )
}
