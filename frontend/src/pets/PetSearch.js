import React, {useState, useEffect} from "react";
import PetApi from "../api";
import PetCardList from "./PetCardList";
import LoadingPage from "../general/LoadingPage"
import FilterForm from "../general/FilterForm";

function PetSearch({type}){
    const[pets, setPets] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [petType, setPetType] = useState(type)

    useEffect(() =>{
        setPetType(type)
    }, [type])

    async function filterSearch({petType,breed,gender,age,color,location}){
        setIsLoading(true)
        let pets = await PetApi.petFilter(petType,breed,gender,age,color,location);
        setPets(pets.animals);
        setIsLoading(false)
    }
    const listContent = (isLoading
                            ? <LoadingPage />
                            : <PetCardList pets = {pets} />)


    return(
        <div>
            <FilterForm filterSearch={filterSearch} type={petType} />
            {pets && listContent}
        </div>
    )
}

export default PetSearch
