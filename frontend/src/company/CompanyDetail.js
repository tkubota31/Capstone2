import React, {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";
import Card from "react-bootstrap/Card"
import PetApi from "../api";
import "../css/CompanyDetail.css"
import { useParams } from "react-router-dom";

function CompanyDetail(){
    const {orgId} = useParams()
    const [orgInfo, setOrgInfo] = useState()
    // let testId ="CT525"

    useEffect(()=>{
        console.log("***** Company Detail UseEffect")
        getCompany(orgId)
    },[])

    async function getCompany(org){
        console.log("**GET COMPANY FUNCTION")
        let orgInfo = await PetApi.getCompany(org)
        console.log(orgInfo.organization)
        setOrgInfo(orgInfo.organization)

    }

    return(
        <div className="col-md-8 offset-md-2">
           <div>
                <img className="card-image" src={orgInfo.photos[0].medium}></img>
            </div>


            <div className="card-content">
                <Card border = "light" className="card-color text-center" text = "light">
                    <Card.Header>Contact Info</Card.Header>
                    <Card.Body>
                        <Card.Title>{orgInfo.name}</Card.Title>
                        <Card.Text>Phone Number: {orgInfo.phone}</Card.Text>
                        <Card.Text>Email : {orgInfo.email}</Card.Text>
                        <Card.Text>Location: {orgInfo.address.city}, {orgInfo.address.state} {orgInfo.address.postcode}</Card.Text>
                        <Card.Link className="card-link" href={orgInfo.website}>Website</Card.Link>
                    </Card.Body>
                </Card>
            </div>

        </div>
        // <h4>UNCH</h4>

    )

}

export default CompanyDetail
