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
                    breed={pet.breed}
                    gender={pet.gender}
                    age={pet.age}
                    spayed_neutered={pet.spayed_neutered}
                    color={pet.color}
                    location={pet.location}
                    image_url={pet.image_url}
                    organization_id={pet.organization}
                />
            ))}
        </div>
    );
}

export default PetCardList;
