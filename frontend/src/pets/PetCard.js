import React, {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

function PetCard({id,name, type, breed, gender, age, spayed_neutered, color, description, location, image_url, organization_id}){
    const {favoritePet, hasFavoritedPet} = useContext(UserContext);
    const [favorited, setFavorited] = useState();

    // useEffect(function updatedFavoritedStatus(){
    //     setFavorited(hasFavoritedPet(id));
    // }, [id,hasFavoritedPet]);


    //add pet as favorite
    async function handleFavorite(evt){
        console.log("HANDLE FAVORITE")
        if(hasFavoritedPet(id)) return;
        favoritePet(id)
        setFavorited(true);
    }

    return(
        <div>
            <Card style={{ width: "18rem"}}>
                <Card.Img variant = "top" src={image_url} alt="Pet Picture" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Pet Type: {type}</ListGroup.Item>
                    <ListGroup.Item>Breed: {breed}</ListGroup.Item>
                    <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                    <ListGroup.Item>Age: {age}</ListGroup.Item>
                    <ListGroup.Item>Hair Color: {color}</ListGroup.Item>
                    <ListGroup.Item>Spayed/Neutered: {String(spayed_neutered)}</ListGroup.Item>
                    <ListGroup.Item>Location: {location}</ListGroup.Item>
                </ListGroup>
                <Button
                    variant="primary"
                    onClick={handleFavorite}
                    disabled = {favorited}>
                {favorited ? "Favorited" : "Add to Favorite"}
                </Button>
            </Card>
        </div>
    );
}

export default PetCard
