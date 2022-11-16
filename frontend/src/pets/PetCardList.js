import React from "react";
import PetCard from "./PetCard";


function PetCardList({pets}){


    return(
        <div style={{display:"flex"}}>
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
                    image_url={pet.primary_photo_cropped?.full ? pet.primary_photo_cropped.full : "Not Found"}
                    organization_id={pet.organization_id}
                />

            ))}
        </div>
    );
}

export default PetCardList;
