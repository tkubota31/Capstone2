import React, {useEffect, useState} from "react";
import PetApi from "../api";
import {Form, Button, Container, Row, Col} from "react-bootstrap"

function FilterForm({filterSearch,type}){
    const INITIAL_STATE ={
        type: type,
        breed: "",
        gender:"",
        age:"",
        color:"",
        location:""
    }

    const US_STATES =["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]


    const [filterTerm, setFilterTerm] = useState(INITIAL_STATE)
    const [breeds, setBreeds] = useState([])
    const [colors, setColors] = useState([])

    //Come back and fix. not hardcoding type but getting type from PETTYPE component
    useEffect(() =>{
        let petType= "dog"
        getBreeds(petType)
        getColors(petType)

    }, []);

    async function getColors(petType){
        let response = await PetApi.petTypeInfo(petType)
        setColors(response.colors)
    }

    async function getBreeds(petType){
        let response = await PetApi.petBreed(petType)
        for(let breed of response){
            setBreeds(breeds =>[...breeds, breed.name])
        }
        // const tempBreeds = [];
        // for (let breed of response) {
        //     tempBreeds.push(breed.name);
        // }
        // setBreeds(tempBreeds);
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("**************")
        console.log(filterTerm)
        filterSearch(filterTerm)
    }

    function handleChange(e){
        const {name, value} = e.target
        setFilterTerm(term =>({...term, [name]:value}))
        console.log(filterTerm)
    }

    return (
        <div>
        <Container fluid>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Row>
                    <Col>
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" defaultValue={filterTerm.gender}  onChange={handleChange}>
                                {/* <select name="gender" value={filterTerm.gender} onChange={handleChange}> */}
                                    <option value="male" >Male</option>
                                    <option value="female">Female</option>
                                {/* </select> */}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formAge">
                            <Form.Label>Age</Form.Label>
                                <Form.Select name="age" defaultValue={filterTerm.age} onChange={handleChange}>
                                    <option value="baby">Baby</option>
                                    <option value="young">Young</option>
                                    <option value="adult">Adult</option>
                                    <option value="senior">Senior</option>
                                </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formBreed">
                            <Form.Label>Breed</Form.Label>
                                <Form.Select name="breed" defaultValue={filterTerm.breed} onChange={handleChange}>
                                    {breeds.map(breed =>(
                                    <option value={breed}>{breed}</option>
                                    ))}
                                </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formColor">
                            <Form.Label>Color</Form.Label>
                                <Form.Select name="color" defaultValue={filterTerm.color} onChange={handleChange}>
                                    {colors.map(color =>(
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formState">
                            <Form.Label>State</Form.Label>
                                <Form.Select name="location" defaultValue={filterTerm.location} onChange={handleChange}>
                                    {US_STATES.map(location =>(
                                        <option key = {location} value ={location}>{location}</option>
                                    ))}
                                </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Button size="sm" variant= "primary" type="submit"> Search </Button>
            </Form>
        </Container>
        </div>
    )
}

export default FilterForm;
