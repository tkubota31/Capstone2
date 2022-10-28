import React, {useState, useEffect} from "react";
import PetApi from "../api";
import PetCardList from "./PetCardList";
import LoadingPage from "../general/LoadingPage";
import FilterForm from "../general/FilterForm";

function PetSearch(){
    const[pets, setPets] = useState([]);

    useEffect(() =>{
        search({});
    }, []);

    async function search({breed,gender,age,color,location}){
        console.log("*********")
        let pets = await PetApi.petFilter(breed,gender,age,color,location);
        console.log(pets.animals)
        setPets(pets.animals);
    }

    // if(!pets) return <LoadingPage/>
    let test = "unch"
    return(
        <div>
            <FilterForm filterFor={search} test={test} />
            {pets.length
                ? <PetCardList pets = {pets} />
                : <h3> No Results Found</h3>
            }
        </div>
    )
}

export default PetSearch
