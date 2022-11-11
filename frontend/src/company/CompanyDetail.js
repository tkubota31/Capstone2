import React, {useContext, useState, useEffect, useInsertionEffect} from "react"
import UserContext from "../auth/UserContext";
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import PetApi from "../api";

function CompanyDetail(){
    const [orgInfo, setOrgInfo] = useState()
    let testId ="CT525"

    useEffect(()=>{
        getCompany(testId)
    },[])

    async function getCompany(orgId){
        let orgInfo = await PetApi.getCompany(orgId)
        console.log(orgInfo.organization)
        setOrgInfo(orgInfo.organization)

    }
    return(
        // <div className="col-md-8 offset-md-2">
        //     <h3>{orgInfo.name}</h3>
        //     <img src={orgInfo.photos[0].medium}></img>

        //     <Card className="text-center">
        //         <Card.Header>{orgInfo.name}</Card.Header>
        //         <Card.Body>
        //             <Card.Title>Contact Info</Card.Title>
        //             <Card.Text>Phone Number: {orgInfo.phone}</Card.Text>
        //             <Card.Text>Email : {orgInfo.email}</Card.Text>
        //             <Card.Text>Location: {orgInfo.address.city}, {orgInfo.address.state} {orgInfo.address.postcode}</Card.Text>
        //             <Card.Link href={orgInfo.website}>Website</Card.Link>
        //         </Card.Body>
        //     </Card>
        //     <h4>Contact Info</h4>
        //     <ul>
        //         <li>Phone Number: {orgInfo.phone}</li>
        //         <li></li>
        //     </ul>

        // </div>
        <h2>Hello</h2>
    )

}

export default CompanyDetail
