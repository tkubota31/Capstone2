import React from "react";
import PetCard from "./PetCard";


function PetCardList({pets}){

    return(
        <div>
            {pets.map(pet =>(
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
                    image_url={pet.image_url}
                    organization_id={pet.organization}
                />

            ))}
        </div>
    );
}

export default PetCardList;
