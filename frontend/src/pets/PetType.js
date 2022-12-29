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
        setPetType(petType)
        getAllPetTypes()
        renderPetType(petType)
        console.log(petType)
    },[petType]);


    const renderPetType = (type) => (
            type
            ? <PetSearch type={type} />
            : <h4> Please Select Pet Type</h4>)

    async function getAllPetTypes(){
        let allTypes = await PetApi.allPetTypes()
        setTypes(allTypes)
    }

    if(!types) return <LoadingPage />


    const buttonStyle = (type) => {
        return {
            background: petType === type.name ? "yellow" : "",
            fontSize: 100 / (window.innerWidth / 100)
        }
    }


   return (
    <div>
        <div className = "pettype-container">
           {types.map((type) =>
            <div className= "pettype-item">
                <Card className= "pettype-card" key={type.name}>
                    <Card.Img className ="pettype-image" variant = "top" src={imgObj[type.name]} alt="Pet Picture" />
                    <Button
                        className= "pettype-button"
                        variant="info"
                        style = {buttonStyle(type)}
                        onClick={() => {
                            setPetType(type.name)
                        }}
                        >
                            {type.name}
                    </Button>
                </Card>
            </div>
           )}
        </div>
        {renderPetType(petType)}
        {/* {petType
            ?<PetSearch type={petType} />
            : <h4> Please Select Pet Type</h4>} */}
    </div>
   )
}

export default PetType
