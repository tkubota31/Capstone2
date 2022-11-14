import React, {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";
import PetApi from "../api";
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

function PetFavorites(){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [favoritePets, setFavoritePets] = useState([])

    useEffect (()=>{
        getAllFavoritedPets(currentUser)
    },[])

    async function getAllFavoritedPets(username){
        let response = await PetApi.getAllFavPets(username)
        setFavoritePets(response)
    }
console.log(favoritePets)

    return (
    <div>
        {favoritePets.map((pet,index) =>(
        <div style ={{display:"flex"}}>
            <Card style={{ width: "18rem"}}>
                <Card.Img variant = "top" src={pet.image_url} alt="Pet Picture" />
                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Pet Type: {pet.type}</ListGroup.Item>
                    <ListGroup.Item>Breed: {pet.breed}</ListGroup.Item>
                    <ListGroup.Item>Gender: {pet.gender}</ListGroup.Item>
                    <ListGroup.Item>Age: {pet.age}</ListGroup.Item>
                    <ListGroup.Item>Hair Color: {pet.color}</ListGroup.Item>
                    <ListGroup.Item>Spayed/Neutered: {String(pet.spayed_neutered)}</ListGroup.Item>
                    <ListGroup.Item>Location: {pet.location}</ListGroup.Item>
                </ListGroup>
            <Button
                variant="danger"
                onClick={() =>{
                    console.log(index)
                    setFavoritePets([...favoritePets.slice(0,index), ...favoritePets.slice(index+1)])
                }}>
            Remove
            </Button>
            </Card>
        </div>
        ))}
    </div>
    )
}


export default PetFavorites
