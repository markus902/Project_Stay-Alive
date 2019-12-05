import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Axios from "axios";
import Loading from "../components/Loading";
import Welcome from "./Welcome"

const Home = () => {
  const { loading, user } = useAuth0();
  const [userData, setUserData] = useState({ username: "" })
  const [firstLoad, setFirstLoad] = useState(false)
  const [characterName, setCharacterName] = useState("")
  const [hairType, setHairType] = useState(0)
  const [bodyType, setBodyType] = useState(0)
  const [colorOne, setcolorOne] = useState(0)
  const [colorTwo, setcolorTwo] = useState(0)

  const firstTimeRef = useRef(true)
  const firstLoadRef = useRef(false)

  const handleChange = (e) => {
    console.log("set" + e.target.id)
    switch (true) {
      case (e.target.id === "bodyType"):
        setBodyType(e.target.value)
        break;
      case (e.target.id === "hairType"):
        setHairType(e.target.value)
        break;
      case (e.target.id === "colorOne"):
        setcolorOne(e.target.value)
        break;
      case (e.target.id === "colorTwo"):
        setcolorTwo(e.target.value)
        break;
      case (e.target.id === "characterName"):
        setCharacterName(e.target.value)
        break;
      default:
        break;
    }
  }

  const handleClick = () => {
    const character = {
      characterName: characterName,
      hairType: hairType,
      bodyType: bodyType,
      color1: colorOne,
      color2: colorTwo,
      UserId: userData.id,
      inventory: []
    }
    Axios.post('/api/addcharacter', character).then(response => {
      console.log(response)
      firstTimeRef.current = false
    }).finally(() => {
      setFirstLoad(true)
    })
  }

  if (loading && !user) {
    return <Loading />;
  }

  if (!loading && user && !firstLoadRef.current) {
    const userData = {
      username: user.nickname,
      email: user.email,
      lastLogin: new Date()
    }
    axios.post('/api/adduser', userData).then(data => {
      setUserData(data.data)
      if (data.data.CharacterId) {
        firstTimeRef.current = false
      }
    }).catch(err => console.log(err)).finally(() => {
      firstLoadRef.current = true
    })

  }
  return (
    <Container>
      {(!firstTimeRef.current) ?
        <Container>
          <h3>Welcome {userData.userName}</h3>
          <p>To get started please add a Task in the <Link to="/task">Task Manger</Link></p>
          <p>Or check out your Character via the <Link to="/character">Character Dashboard</Link></p>
        </Container>
        :
        !user ? <Welcome /> :
          <Row>
            <Col>
              <img src="https://via.placeholder.com/350x350" alt="character" />
            </Col>
            <Col>
              <Form>
                <FormGroup>
                  <Label for="characterName">Character Name:</Label>
                  <Input type="text" name="characterName" id="characterName" placeholder={characterName} onChange={handleChange}></Input>
                  <Label for="bodyType">Body Type:</Label>
                  <Input type="select" name="bodyType" id="bodyType" onChange={handleChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </Input>
                  <Label for="hairType">Hair Type:</Label>
                  <Input type="select" name="hairType" id="hairType" onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Input>
                  <Label for="colorOne">Color 1:</Label>
                  <Input type="select" name="colorOne" id="colorOne" onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Input>
                  <Label for="colorTwo">Color 2:</Label>
                  <Input type="select" name="colorTwo" id="colorTwo" onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Input>
                  <Button onClick={handleClick}>Submit</Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
      }

    </Container>
  )
};

export default Home;
