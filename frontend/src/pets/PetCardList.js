import React from "react";
import PetCard from "./PetCard";
import "../css/PetCardList.css"

function PetCardList({pets}){


    return(
        <div className="petcard-container">
            {pets.length === 0
            ? <h4>No results found</h4>
            :
            pets.map(pet =>(
                <PetCard
                    key={pet.id}
                    id={pet.id}
                    name ={pet.name}
                    type={pet.type}
                    breed={pet.breeds.primary}
                    gender={pet.gender}
                    age={pet.age}
                    spayed_neutered={pet.attributes.spayed_neutered}
                    color={pet.colors.primary}
                    location={pet.contact.address.state}
                    image_url={pet.primary_photo_cropped !== null ? pet.primary_photo_cropped.full : "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=6&m=1216251206&s=612x612&w=0&h=G8kmMKxZlh7WyeYtlIHJDxP5XRGm9ZXyLprtVJKxd-o="}
                    organization_id={pet.organization_id}
                />

            ))}
        </div>
    );
}

export default PetCardList;
