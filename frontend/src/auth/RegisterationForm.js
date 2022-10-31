import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../general/Alert";
import Button from "react-bootstrap/Button"

//get register function from App.js once I make it
function RegisterationForm ({register}){
    const INITIAL_STATE ={
        username:"",
        password:"",
        firstName: "",
        lastName:"",
        email:""
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([]);


    //once form submitted, will log in user, redirect to pet page, and create token
    async function handleSubmit(e){
        e.preventDefault();
        let result = await register(formData);
        if(result.success) {
            navigate("/pets");
        } else{
            setFormErrors(result.errors);
        }
    }

    //update form data field
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
      }


      return(
        <div className="RegisterationForm">
            <h2>Register Here</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                         />
                    </div>

                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            name="firstName"
                            className="form-control"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            name="lastName"
                            className="form-control"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {formErrors.length
                        ? <Alert type="danger" messages={formErrors} />
                        : null
                    }

                    <Button
                        variant="dark"
                        type="submit"
                        className="btn btn-primary float-right"
                        onSubmit={handleSubmit}
                    >
                    Submit
                    </Button>
                </form>
            </div>

        </div>
      );
}

export default RegisterationForm;
