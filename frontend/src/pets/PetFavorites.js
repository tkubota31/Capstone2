import {React, useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";
import PetApi from "../api";
import {Card, ListGroup,Button} from "react-bootstrap"
import {Link,useNavigate} from "react-router-dom";

function PetFavorites(){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [favoritePets, setFavoritePets] = useState([])
    const navigate = useNavigate()

    useEffect (()=>{
        getAllFavoritedPets(currentUser)
    },[])

    async function getAllFavoritedPets(username){
        let response = await PetApi.getAllFavPets(username)
        setFavoritePets(response)
    }
console.log(favoritePets)

    return (
    <div style={{display:"flex"}}>
        {favoritePets.map((pet,index) =>(
        <div style ={{display:"flex"}}>
            <Card className= " "key = {`petcard${index}`}style={{ width: "18rem"}}>
                <Card.Img variant = "top" src={pet.image_url} alt="Pet Picture" />
                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item key={`type_${pet.type}`}>Pet Type: {pet.type}</ListGroup.Item>
                    <ListGroup.Item key={`breed_${pet.breed}`}>Breed: {pet.breed}</ListGroup.Item>
                    <ListGroup.Item key={`gender_${pet.gender}`}>Gender: {pet.gender}</ListGroup.Item>
                    <ListGroup.Item key={`age_${pet.age}`}>Age: {pet.age}</ListGroup.Item>
                    <ListGroup.Item key={`hair_${pet.color}`}>Hair Color: {pet.color}</ListGroup.Item>
                    <ListGroup.Item key={`spayed_${pet.spayed_neutered}`}>Spayed/Neutered: {String(pet.spayed_neutered)}</ListGroup.Item>
                    <ListGroup.Item key={`location_${pet.location}`}>Location: {pet.location}</ListGroup.Item>
                </ListGroup>
                {/* <Link className="" to={`/company/${pet.organization_id}`}>Organization Info</Link> */}

            <div class="btn-group">
                <button type="button" class="btn btn-info"
                onClick= {()=>{
                    navigate(`/company/${pet.organization_id}`)
                    }}> Organization
                </button>
                <button type="button" class="btn btn-danger"
                onClick= {() =>{
                    setFavoritePets([...favoritePets.slice(0,index), ...favoritePets.slice(index+1)])
                }}>Remove</button>
            </div>
            {/* <Button
                variant="danger"
                onClick={() =>{
                    console.log(index)
                    setFavoritePets([...favoritePets.slice(0,index), ...favoritePets.slice(index+1)])
                }}>
            Remove
            </Button> */}
            </Card>
        </div>
        ))}
    </div>
    )
}


export default PetFavorites