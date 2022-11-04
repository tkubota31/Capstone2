import React, {useState, useEffect} from "react";
import PetApi from "../api";
import LoadingPage from "../general/LoadingPage";
import PetSearch from "./PetType"
import {Card, Button} from "react-bootstrap"
import CatDog from "../images/catdog.webp"
import {useNavigate} from "react-router-dom"

function PetType(){
    const[types, setTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        getAllPetTypes()
    },[]);

    async function getAllPetTypes(){
        let allTypes = await PetApi.allPetTypes()
        setTypes(allTypes)
    }

    // if(!types) return <LoadingPage />

    console.log(types)
   return (
    <div>
        <div>
           {/* this formay of doing cards is better! */}
                <Card style={{ width: "18rem"}}>
                    <Card.Img variant = "top" src={CatDog} alt="Pet Picture" />
                    <Button
                        variant="info"
                        href = "/">
                            DOGS
                    </Button>
                </Card>


                {/* <Card style={{ width: "18rem"}}>
                    <Button
                        variant="primary">
                            DOGS
                            <Card.Img src={CatDog} alt="Pet Picture" />
                    </Button>
                </Card> */}


            </div>
        {/* {types.map(type =>(
            <div>
                <Card className="bg-dark text-white">
                    <Card.Img src="holder.js/100px270" alt="Card image" />
                    <Card.ImgOverlay>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                        </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text>
                    </Card.ImgOverlay>
                </Card>


                {/* <PetSearch
                    key={type.name}
                    type={type.name} /> */}
            {/* </div>
        ))} */}
    </div>
   )
}

export default PetType
