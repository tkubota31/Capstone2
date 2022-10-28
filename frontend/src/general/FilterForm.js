import React, {useState} from "react";


function FilterForm({filterFor,test}){
    const INITIAL_STATE ={
        breed: "",
        gender:"",
        age:"",
        color:"",
        location:""
    }

    const [filterTerm, setFilterTerm] = useState(INITIAL_STATE)

    console.log(test)
    function handleSubmit(e){
        e.preventDefault();
        filterFor()
        setFilterTerm(filterTerm)
    }

    function handleChange(e){
        console.log(e.target)
        const {name, value} = e.target
        setFilterTerm(filterTerm =>({...filterTerm, [name]:value}))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Gender
                    <select value={filterTerm.gender} onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </label>

                <label>
                    Age
                    <select value={filterTerm.age} onChange={handleChange}>
                        <option value="baby">Baby</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                </label>



                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default FilterForm;
