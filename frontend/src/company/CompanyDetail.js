import React, {useContext, useState, useEffect} from "react"
import UserContext from "../auth/UserContext";
import Card from "react-bootstrap/Card"
import PetApi from "../api";
import "../css/CompanyDetail.css"
import { useParams } from "react-router-dom";
import LoadingPage from "../general/LoadingPage";

function CompanyDetail(){
    const {orgId} = useParams()
    const [orgInfo, setOrgInfo] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getCompany(orgId)
    },[])

    async function getCompany(org){
        let orgInfo = await PetApi.getCompany(org)
        setOrgInfo(orgInfo.organization)
        setIsLoading(false)
        console.log(orgInfo)
    }




        return(

            <div className="col-md-8 offset-md-2">
                {isLoading
                ? <LoadingPage/>
                :
                <div>
                    <div>
                        {orgInfo.photos[0]?.medium
                        ? <img className="card-image" src={orgInfo.photos[0].medium} alt="Picture"/>
                        : <h2>Organization Information</h2>
                    }

                    </div>


                    <div className="card-content">
                        <Card border = "light" className="card-color text-center" text = "light">
                            <Card.Header>Contact Info</Card.Header>
                            <Card.Body>
                                <Card.Title>{orgInfo.name}</Card.Title>
                                <Card.Text>Phone Number: {orgInfo.phone}</Card.Text>
                                <Card.Text>Email : {orgInfo.email}</Card.Text>
                                <Card.Text>Location: {orgInfo.address.city}, {orgInfo.address.state} {orgInfo.address.postcode}</Card.Text>
                                <Card.Link className="btn btn-primary" href={orgInfo.website}>Website</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div> }
            </div>
            // <h4>UNCH</h4>

        )
     }

export default CompanyDetail
