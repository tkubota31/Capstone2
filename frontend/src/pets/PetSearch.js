import React, {useState, useEffect} from "react";
import PetApi from "../api";
import PetCardList from "./PetCardList";
import LoadingPage from "../general/LoadingPage";
import FilterForm from "../general/FilterForm";

function PetSearch({type}){
    const[pets, setPets] = useState([]);

    useEffect(() =>{
        filterSearch({});
    }, []);

    async function filterSearch({type,breed,gender,age,color,location}){
        let pets = await PetApi.petFilter(type,breed,gender,age,color,location);
        setPets(pets.animals);
    }

    if(!pets) return <LoadingPage/>
    return(
        <div>
            <FilterForm filterSearch={filterSearch} type={type} />
            {pets.length
                ? <PetCardList pets = {pets} />
                : <h3> No Results Found</h3>
            }
        </div>
    )
}

export default PetSearch
