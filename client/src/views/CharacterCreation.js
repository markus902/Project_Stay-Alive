import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../utils/UserContext'
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios'

export default function CharacterCreation() {
  const { userContext, setUserContext } = useContext(UserContext)
  const [characterName, setCharacterName] = useState("")
  const [hairType, setHairType] = useState(1)
  const [bodyType, setBodyType] = useState(1)
  const [color, setcolor] = useState(1)
  const [characterImage, setCharacterImage] = useState(`B${bodyType}H${hairType}C${color}.png`)

  const handleChange = (e) => {
    let body = "B"+bodyType
    let hair = "H"+hairType
    let c1 = "O"+color
    console.log(body,hair,c1)
    switch (true) {
      case (e.target.id === "bodyType"):
        setBodyType(e.target.value)
        break;
      case (e.target.id === "hairType"):
        setHairType(e.target.value)
        break;
      case (e.target.id === "color"):
        setcolor(e.target.value)
        break;
      case (e.target.id === "characterName"):
        setCharacterName(e.target.value)
        break;
      default:
        break;
    }
    console.log(characterImage, "Inside the handlechange " + e.target.value)
    
    setCharacterImage(`B${bodyType}H${hairType}C${color}.png`)
  }


  const handleClick = () => {
    const character = {
      characterName: characterName,
      hairType: hairType,
      bodyType: bodyType,
      color1: color,
      color2: "",
      UserId: userContext.User.id
    }
    axios.post('/api/addcharacter', character)
      .then(response => { return response.data[0] })
      .then((userResponse) => {
        axios.get(`/api/character/${userResponse.id}`)
          .then((char) => {
            console.log(char)
            setUserContext({ User: char.data[0] })
          })
      })
  }

  useEffect(() => {
   console.log("Inside the Use Effect" + characterImage)
   setCharacterImage(`B${bodyType}H${hairType}C${color}.png`)
  }, [characterImage,bodyType,hairType,color])

  return (
    <div>
      <Row>
        <h1>Character Creation</h1>
  <p>{characterImage}</p>
      </Row>
      <Row>
        <Col>
          <img src={`/assets/character/${characterImage}`} className="characterImage" alt="character" />
        </Col>
        <Col>
          <Form>
            <FormGroup>
              <Label for="characterName">Character Name:</Label>
              <Input type="text" name="characterName" id="characterName" placeholder={characterName} onChange={handleChange}></Input>
              <Label for="bodyType">Body Type:</Label>
              <Input type="select" name="bodyType" id="bodyType" onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Input>
              <Label for="hairType">Hair Type:</Label>
              <Input type="select" name="hairType" id="hairType" onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Input>
              <Label for="color">Color 1:</Label>
              <Input type="select" name="color" id="color" onChange={handleChange}>
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
