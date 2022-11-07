import React, {useState, useEffect} from "react";
import PetApi from "../api";
import LoadingPage from "../general/LoadingPage";
import PetSearch from "./PetType"
import {Card, Button} from "react-bootstrap"
import CatDog from "../images/catdog.webp"


function PetType(){
    const[types, setTypes] = useState([]);
    const[petType, setPetType] = useState();

    useEffect(() =>{
        getAllPetTypes()
    },[]);


    async function getAllPetTypes(){
        let allTypes = await PetApi.allPetTypes()
        setTypes(allTypes)
    }

    if(!types) return <LoadingPage />

   return (
    <div>
        <div style={{display:"flex"}}>
           {/* this formay of doing cards is better! */}
           {types.map((type) =>
                <Card key={type.name} style={{ width: "18rem"}}>
                    <Card.Img variant = "top" src={CatDog} alt="Pet Picture" />
                    <Button
                        variant="info"
                        onClick={() => {
                            setPetType(type.name)
                            console.log(type)
                            // setColors()
                            // setBreeds()
                        }}
                        >
                            {type.name}
                    </Button>
                </Card>
           )}
            </div>
            {/* <PetSearch type={petType} /> */}
    </div>
   )
}

export default PetType
