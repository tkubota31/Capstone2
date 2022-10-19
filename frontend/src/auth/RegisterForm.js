import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../general/Alert";


function RegisterForm ({register}){
    const INITIAL_STATE ={
        username:"",
        password:"",
        firstName: "",
        lastName:"",
        email:""
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, seFormErrors] = useState([]);
}
