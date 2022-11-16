import React, {useState, useEffect} from "react";
import PetApi from "../api";
import LoadingPage from "../general/LoadingPage";
import PetSearch from "./PetSearch"
import {Card, Button} from "react-bootstrap"
import Barnyard from "../images/barnyardType.jpeg"
import Bird  from "../images/birdType.jpeg"
import Cat from "../images/catType.jpeg"
import Dog from "../images/dogType.jpeg"
import Horse from "../images/horseType.jpeg"
import Rabbit from "../images/rabbitType.webp"
import Scales from "../images/scalesfins&otherType.jpeg"
import Furry from "../images/small&furryType.webp"
import "../css/PetType.css"


function PetType(){
    const[types, setTypes] = useState([]);
    const[petType, setPetType] = useState();

    let imgObj ={
        "Dog": Dog,
        "Cat":Cat,
        "Rabbit": Rabbit,
        "Small & Furry": Furry,
        "Horse": Horse,
        "Bird": Bird,
        "Scales, Fins & Other": Scales,
        "Barnyard": Barnyard
    }

    useEffect(() =>{
        getAllPetTypes()
    },[]);


    async function getAllPetTypes(){
        let allTypes = await PetApi.allPetTypes()
        setTypes(allTypes)
    }
    console.log(types)
    if(!types) return <LoadingPage />

   return (
    <div>
        <div className = "pettype-container">
           {types.map((type) =>
            <div className= "pettype-item">
                <Card className= "pettype-card" key={type.name}>
                    <Card.Img variant = "top" src={imgObj[type.name]} alt="Pet Picture" />
                    <Button
                        variant="info"
                        style = {{background: petType === type.name
                                             ? "yellow"
                                             :""}}
                        onClick={() => {
                            setPetType(type.name)
                            console.log(petType)
                        }}
                        >
                            {type.name}
                    </Button>
                </Card>
            </div>
           )}
        </div>
        {petType
            ?<PetSearch type={petType} />
            : <h4> Please Select Pet Type</h4>}
    </div>
   )
}

export default PetType
