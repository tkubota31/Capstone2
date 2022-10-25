import React, {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";

function PetCard({id,name, type, breed, gender, age, spayed_neutered, color, description, location, image_url, organization_id}){
    const {favoritePet, hasFavoritedPet} = useContext(UserContext);
    const [favorited, setFavorited] = useState();

    useEffect(function updatedFavoritedStatus(){
        setFavorited(hasFavoritedPet(id));
    }, [id,hasFavoritedPet]);

    async function handleFavorited(evt){
        if(hasFavoritedPet(id)) return;
        favoritePet(id)
        setFavorited(true);
    }

    return(
        <div>
            <h2>{name}</h2>


        </div>
    )
}
