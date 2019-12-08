import React, { useContext, useState } from 'react'
import UserContext from '../utils/UserContext'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios'

export default function CharacterCreation() {
  const { userContext, setUserContext } = useContext(UserContext)
  const [characterName, setCharacterName] = useState("")
  const [hairType, setHairType] = useState(0)
  const [bodyType, setBodyType] = useState(0)
  const [colorOne, setcolorOne] = useState(0)
  const [colorTwo, setcolorTwo] = useState(0)


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
      UserId: userContext.User.id
    }
    axios.post('/api/addcharacter', character)
      .then(response => { return response.data[0] })
      .then((response) => {
        console.log(response)
        axios.get(`/api/character/${response.id}`)
          .then((response) => {
            setUserContext({ user: response.data })
          })
      })
  }
  console.log(userContext)
  return (
    <div>
      <Row>
        <h1>Character Creation</h1>
      </Row>
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
    </div>
  )
}
