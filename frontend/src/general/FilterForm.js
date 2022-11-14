import React, {useEffect, useState} from "react";
import PetApi from "../api";
import {Form, Button, Container, Row, Col, FloatingLabel} from "react-bootstrap"

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
        if(type){
            getBreeds(type)
            getColors(type)
        }
    }, [type]);

    async function getColors(petType){

        let response = await PetApi.petTypeInfo(petType)
        if(response){
            setColors(response.colors)
        }
    }

    async function getBreeds(petType){
        let response = await PetApi.petBreed(petType)
        // for(let breed of response){
        //     setBreeds(breeds =>[...breeds, breed.name])
        // }
        if(response){
            const tempBreeds = [];
        for (let breed of response) {
            tempBreeds.push(breed.name);
        }
        setBreeds(tempBreeds);
        }

    }

    function handleSubmit(e){
        e.preventDefault();
        filterSearch(filterTerm)
    }

    function handleChange(e){
        const {name, value} = e.target
        setFilterTerm(term =>({...term, [name]:value}))
    }

    return (
        <div>
        <Container fluid>
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Row>
                    <Col>
                        <Form.Group controlId="formGender">
                            <FloatingLabel label="Gender">
                                <Form.Select name="gender" defaultValue={filterTerm.gender}  onChange={handleChange}>
                                        <option>Choose Option</option>
                                        <option key ="male" value="male" >Male</option>
                                        <option key ="female" value="female">Female</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formAge">
                            <FloatingLabel label="Age">
                                <Form.Select name="age" defaultValue={filterTerm.age} onChange={handleChange}>
                                    <option>Choose Age</option>
                                    <option key="baby" value="baby">Baby</option>
                                    <option key="young" value="young">Young</option>
                                    <option key="adult" value="adult">Adult</option>
                                    <option key="senior" value="senior">Senior</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formBreed">
                        <FloatingLabel label="Breed">
                                <Form.Select name="breed" defaultValue={filterTerm.breed} onChange={handleChange}>
                                    <option>Choose Breed</option>
                                    {breeds.map(breed =>(
                                    <option key={`breed_${breed}`} value={breed}>{breed}</option>
                                    ))}
                                </Form.Select>
                        </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formColor">
                            <FloatingLabel label="color">
                                <Form.Select name="color" defaultValue={filterTerm.color} onChange={handleChange}>
                                    <option>Choose Color</option>
                                    {colors.map(color =>(
                                        <option key={`color_${color}`} value={color}>{color}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formState">
                            <FloatingLabel label= "state">
                                <Form.Select name="location" defaultValue={filterTerm.location} onChange={handleChange}>
                                    <option>Choose State</option>
                                    {US_STATES.map(location =>(
                                        <option key = {location} value ={location}>{location}</option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
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
