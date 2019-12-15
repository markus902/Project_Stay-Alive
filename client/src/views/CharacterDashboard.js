import React, { useContext} from 'react'
import UserContext from '../utils/UserContext'
import { Row, Col } from "reactstrap";
import Loading from "../components/Loading"

export default function CharacterDashboard() {
    const { userContext } = useContext(UserContext)

    if(userContext.User==="None"){
        return <Loading />
    }
    const characterImage="/assets/character/B"+userContext.User.bodyType+"H"+userContext.User.hairType+"C"+userContext.User.color1+".png"
    console.log(characterImage)
    let nextLevel = (400-userContext.User.experience)+userContext.User.experience
    return (


        <div>
            <h1>Character Dashboard</h1>
            <Row className="bg-success p-3 border rounded">
                <Col>
                    <img src={characterImage} alt={"Char portrait"} />
                </Col>
                <Col>
                    <Row>
                        <h2>Name: {userContext.User.characterName}</h2>
                    </Row>
                    <Row>
                        <h4>Experience: {userContext.User.experience}/{nextLevel}</h4>
                    </Row>
                    <Row>
                        <h4>Health: {userContext.User.health}</h4>
                    </Row>
                    <Row>
                        <h4>Level: {Math.floor(userContext.User.experience / 400) + 1}</h4>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
