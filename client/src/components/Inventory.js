import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../utils/UserContext';
import { useAuth0 } from '../react-auth0-spa';
import { Row, Col, Button } from "reactstrap";
import Loading from "./Loading";
import axios from 'axios';


export default function Inventory() {
  const { isAuthenticated } = useAuth0();
  const { userContext, setUserContext } = useContext(UserContext);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      if (userContext.User !== "None") {
        getCharacterPowerups();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext])


  const getCharacterPowerups = () => {
    let currentCharacterId = userContext.User.User.CharacterId;
    axios.get(`/api/inventory/${currentCharacterId}`)
      .then(res => {
        setInventory(res.data);
      });
  };

  const handleUseItem = (PowerUpId, PowerUpType) => {
    let currentCharacterId = userContext.User.User.CharacterId;
    let health = userContext.User.health;
    let experience = userContext.User.experience;
    if (PowerUpType === "Experience Boost") {
      experience = experience + 50;
    }
    else {
      health = health + 25;
    }
    axios.post(`/api/useItem/`, { currentCharacterId, PowerUpId }).then(res => {
    }).then(() => {
      axios.post(`/api/activatePowerUp/${currentCharacterId}`, {
        characterName: userContext.characterName,
        health: health,
        experience: experience,
      })
        .then(res => {
          getCharacterPowerups();
          axios.get(`/api/character/${currentCharacterId}`)
            .then(res => {
              setUserContext({ User: res.data[0] });
            })
        })
        .catch(err => { console.log(err); });
    });
  };

  //for dev testing
  // const handleAddItem = (PowerUpId, PowerUpName) => {
  //   let CharacterId = userContext.User.User.CharacterId;
  //   axios.post(`/api/addinventory/`, { CharacterId, PowerUpId, PowerUpName })
  //     .then(res => {
  //     })
  //     .catch(err => { console.log(err); });
  // };


  //for dev testing
  // const getAllInventory = () => {
  //   axios.get('/api/inventory/')
  //     .then(res => {
  //       console.log("getting full inventory", res)
  //       if (res.data.length === 0) {
  //         alert("something went wrong, the inventory is empty and it shouldn't be");
  //       }
  //       else {
  //         console.log("line 65: before setInventory res.data: ", res.data);
  //         setInventory(res.data);
  //       }
  //       console.log("line 62: inventory after setInventory ", inventory);

  //     });
  // };

  if (userContext.User === "None") {
    return <Loading />
  }

  return (
    <div>
      <h3>Inventory:</h3>
      {/* <Button onClick={getCharacterPowerups}>Fetch your Items</Button> */}
      {/* <Button onClick={getAllInventory}>See all Items</Button> */}
      <Row>
        {inventory.length > 0 ?
          inventory.map(elem =>
            <Col md={6}>
              <div>
                <h4 key={elem.PowerUpName}>{elem.PowerUpName} - {elem.PowerUpType || elem.PowerUp.PowerUpType}</h4>
                <p> {elem.Description || elem.PowerUp.Description}</p>
                <img alt={elem.PowerUpName} src={elem.imageSrc || elem.PowerUp.imageSrc}></img>
                <hr />
                <Button onClick={() => handleUseItem(elem.id, elem.PowerUpType || elem.PowerUp.PowerUpType)}>Use Item</Button>
                {/* <Button onClick={() => handleAddItem(elem.id, elem.PowerUpName, elem.PowerUpType || elem.PowerUp.PowerUpType)}>Add Item to character</Button> */}
                <hr />
              </div>
            </Col>)
          : <p>No Items in your inventory</p>
        }
      </Row>
    </div>
  )
}
