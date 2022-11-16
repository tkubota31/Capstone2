import React, {useState, useEffect} from "react";
import PetApi from "../api";
import PetCardList from "./PetCardList";
import LoadingPage from "../general/LoadingPage"
import FilterForm from "../general/FilterForm";

function PetSearch({type}){
    const[pets, setPets] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    async function filterSearch({type,breed,gender,age,color,location}){
        setIsLoading(true)
        let pets = await PetApi.petFilter(type,breed,gender,age,color,location);
        console.log(pets)
        setPets(pets.animals);
        setIsLoading(false)
    }
    const listContent = (isLoading
                            ? <LoadingPage />
                            : <PetCardList pets = {pets} />)


    return(
        <div>
            <FilterForm filterSearch={filterSearch} type={type} />
            {pets && listContent}
        </div>
    )
}

export default PetSearch
