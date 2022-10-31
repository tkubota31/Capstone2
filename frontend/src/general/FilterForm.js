import React, {useEffect, useState} from "react";
import { createRoutesFromElements } from "react-router-dom";
import PetApi from "../api";

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

    useEffect(() =>{
        getBreeds()
    }, []);

    async function getColors(type){
        let response = PetApi.petTypeInfo(type)
        setColors(response.colors)
    }

    async function getBreeds(type){
        let response = PetApi.petBreed(type)
        setBreeds(response)
    }

    function handleSubmit(e){
        e.preventDefault();
        const {breed,gender,age,color,location} = filterTerm
        filterSearch(filterTerm)
        setFilterTerm(INITIAL_STATE)
    }

    function handleChange(e){
        const {name, value} = e.target
        setFilterTerm(filterTerm =>({...filterTerm, [name]:value}))
        console.log(filterTerm)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Gender
                    <select name="gender" value={filterTerm.gender} onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>

                <label>
                    Age
                    <select name="age" value={filterTerm.age} onChange={handleChange}>
                        <option value="baby">Baby</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </label>

                <label>
                    Breed
                    <select name="breed" value={filterTerm.breed} onChange={handleChange}>
                        {breeds.map(breed =>(
                         <option value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Color
                    <select name="color" value={filterTerm.color} onChange={handleChange}>
                        {colors.map(color =>(
                            <option value={color}>{color}</option>
                        ))}
                    </select>
                </label>

                <label>
                    State
                    <select name="state" valu={filterTerm.state} onChange={handleChange}>
                        {US_STATES.map(state =>(
                            <option value ={state}>{state}</option>
                        ))}
                    </select>
                </label>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default FilterForm;
