import React, {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";

function PetCard({id,name, type, breed, gender, age, spayed_neutered, color, description, location, image_url, organization_id}){
    const {favoritePet, hasFavoritedPet} = useContext(UserContext);
    const [favorited, setFavorited] = useState();

    useEffect(function updatedFavoritedStatus(){
        setFavorited(hasFavoritedPet(id));
    }, [id,hasFavoritedPet]);


    //add pet as favorite
    async function handleFavorite(evt){
        if(hasFavoritedPet(id)) return;
        favoritePet(id)
        setFavorited(true);
    }

    return(
        <div>
            <h2>{name}</h2>
            <img src={image_url} alt="Pet Picture" />
            <ul>
                <li>Pet Type: {type}</li>
                <li>Breed: {breed}</li>
                <li>Gender: {gender}</li>
                <li>Age: {age}</li>
                <li>Hair Color: {color}</li>
                <li>Spayed/Neutered: {String(spayed_neutered)}</li>
                <li>Location: {location}</li>
            </ul>
            <p>{description}</p>
            <button
                onClick={handleFavorite}
                disabled = {favorited}>
              {favorited ? "Favorited" : "Add to Favorite"}
            </button>
        </div>
    );
}

export default PetCard
