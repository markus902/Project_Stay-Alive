import React, { useState, useRef } from "react";
import { Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";
import Inventory from "../components/Inventory";
import { useAuth0 } from "../react-auth0-spa";
import Axios from "axios";

const Profile = () => {
  const { loading, user } = useAuth0();
  const [onLoad, setOnLoad] = useState(false)
  const userRef = useRef(0)
  const charRef = useRef({ CharacterId: 0 })


  
  if (loading || !user) {
    return <Loading />;
  }
  if (!onLoad && user) {
    Axios.get(`/api/getuserbyusername/${user.nickname}`).then(response => {
      userRef.current = response.data[0]
      charRef.current = userRef.current.CharacterId
    }).then(() => {
      if (charRef.current.CharacterId !== 0) {
        Axios.get(`/api/character/${charRef.current}`).then(response => {
          charRef.current = response.data[0]
          console.log(charRef.current)
          setOnLoad(true)
        })
      }
    }).catch(err => console.log(err))
  }

  return (
    <Container className="mb-5">
      {charRef.current.id === 0 ? <div></div>
        :
        (
          <div>
            <Row className="bg-success p-3 border rounded">
              <Col>
                <img src="https://via.placeholder.com/250x250" alt={charRef.current.characterName} />
              </Col>
              <Col>
                <Row>
                  <h2>Name: {charRef.current.characterName}</h2>
                </Row>
                <Row>
                  <h4>Experience: {charRef.current.experience}/{charRef.current.experience + 400}</h4>
                </Row>
                <Row>
                  <h4>Health: {charRef.current.health}</h4>
                </Row>
                <Row>
                  <h4>Level: {Math.floor(charRef.current.experience / 400) + 1}</h4>
                </Row>
              </Col>
            </Row>
            <Row className="bg-warning mt-4 p-3 border rounded">
              <h1 className="m-0 p-0">Inventory:</h1>
              <Inventory itemId={1} />
            </Row>
          </div>
        )}
    </Container>
  );
};

export default Profile;
