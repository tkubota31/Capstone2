import React, {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import CompanyDetail from "../company/CompanyDetail"
import {Container, Nav, Navbar} from "react-bootstrap"
import {Link, NavLink, useNavigate} from "react-router-dom";
import "../css/PetCard.css"
import PetApi from "../api";


function PetCard({id,name, type, breed, gender, age, spayed_neutered, color, description, location, image_url, organization_id}){
    const {favoritePet, hasFavoritedPet, currentUser} = useContext(UserContext);
    const [favorited, setFavorited] = useState();
    let favArray = [];
    const navigate = useNavigate();

    useEffect(function updatedFavoritedStatus(){
        updatedFavoritedPets(currentUser)
        setFavorited(hasFavoritedPet(id));
        console.log(favorited)
    }, [id,favorited]);

    async function updatedFavoritedPets(currentUser){
        let response = await PetApi.getAllFavPets(currentUser)
        response.map((pet) =>{
            favArray.push(parseInt(pet.pet_id))
        })
        setFavorited(favArray.includes(id))
    }


    //add pet as favorite
    async function handleFavorite(evt){
        if(hasFavoritedPet(id)) return;
        favoritePet(id)
        setFavorited(true);
    }


    return(
        <div style = {{display:"flex"}}>
            <Card className= "petcard-card">
                <Card.Img className= "petcard-img" variant = "top" src={image_url} alt="Pet Picture" />
                <Card.Title className= "petcard-title">{name}</Card.Title>
                <ListGroup className="petcard-list" variant="flush">
                    <ListGroup.Item>Pet Type: {type}</ListGroup.Item>
                    <ListGroup.Item>Breed: {breed}</ListGroup.Item>
                    <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                    <ListGroup.Item>Age: {age ? age : "Unknown"}</ListGroup.Item>
                    <ListGroup.Item>Hair Color: {color ? color : "Unknown"}</ListGroup.Item>
                    <ListGroup.Item>Spayed/Neutered: {String(spayed_neutered)}</ListGroup.Item>
                    <ListGroup.Item>Location: {location}</ListGroup.Item>
                </ListGroup>
                <div className="btn-group">
                    <button type="button" className="btn btn-info"
                    onClick= {()=>{
                        navigate(`/company/${organization_id}`)
                        }}> Organization
                    </button>
                    <button type="button" className="btn btn-success"
                    onClick= {handleFavorite}
                    disabled = {favorited}>
                        {favorited ? "Favorited" : "Add to Favorite"}
                    </button>
                </div>
                {/* <Link to={`/company/${organization_id}`}>UNCH</Link>
                <Button
                    variant="primary"
                    onClick={handleFavorite}
                    disabled = {favorited}>
                {favorited ? "Favorited" : "Add to Favorite"}
                </Button> */}
            </Card>
        </div>
    );
}

export default PetCard
