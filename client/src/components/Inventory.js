import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../utils/UserContext'
import { Row, Col, Button } from "reactstrap";
import Loading from "./Loading";
import axios from 'axios';




export default function Inventory() {
  const { userContext, setUserContext } = useContext(UserContext);
  const [inventory, setInventory] = useState(null);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(null);

  // console.log(userContext)
  // state = {
  //   user: this.props.User,
  //   itemIds: [],
  //   inventory: []
  // };


  useEffect(() => {
    // console.log("Inside the Use Effect", userContext);
    if (userContext.User === "None") {
      return <Loading />
    }
  }, []);

  // useEffect(() => {
  //   // console.log(inventory);
  // }, [inventory]);
  // useEffect(() => {
  //   // console.log(inventory);
  // }, [item]);


  const getCharacterPowerups = () => {
    console.log("line 40: userContext.User: ", userContext.User)
    let currentCharacterId = userContext.User.User.CharacterId;
    axios.get(`/api/inventory/${currentCharacterId}`)
      .then(res => {
        console.log("getting character specific items.. res:", res)
        if (res.data.length === 0) {
          alert("You have no items to show or something went wrong");
        }
        else {
          console.log("line 49: before setInventory res.data: ", res.data);
          setInventory(res.data);
        }
        console.log("line 52: inventory after setInventory ", inventory);
      });
  };

  //for dev testing
  const getAllInventory = () => {
    axios.get('/api/inventory/')
      .then(res => {
        console.log("getting full inventory", res)
        if (res.data.length === 0) {
          alert("something went wrong, the inventory is empty and it shouldn't be");
        }
        else {
          console.log("line 65: before setInventory res.data: ", res.data);
          setInventory(res.data);
        }
        console.log("line 68: inventory after setInventory ", inventory);

      });
  };

  const handleUseItem = (PowerUpId, PowerUpType) => {
    let currentCharacterId = userContext.User.User.CharacterId;

    console.log("current charid", currentCharacterId)

    setLoading(true); // set loading to true until the axios is done 
    // Pull data to get the user health and experience 
    let health = userContext.User.health;
    let experience = userContext.User.experience;
    // let oldUserInventory = userContext.User.CharacterPowerups;
    // console.log('oldUserInventory:', oldUserInventory);
    // let userInventory = oldUserInventory.filter((elem) => {
    //   return elem !== PowerUpId;
    // })
    if (PowerUpType === "ExperienceBoost") { // PowerUpType ? reward giveHealth : reward giveExperience
      experience = experience + 50;
      // NEED TO check for level up 
    }
    else {
      health = health + 25;
    }
    // NEED TO update CharacterPowerUps to remove the item from CharacterPowerUps
    console.log("health:", health);
    console.log("experience:", experience);
    axios.post(`/api/useItem/`, { currentCharacterId, PowerUpId }).then(res => {
      console.log("pwI", PowerUpId);
      console.log(res);
    }).then(() => {
      axios.post(`/api/activatePowerUp/${currentCharacterId}`, {
        characterName: userContext.characterName,
        health: health,
        experience: experience,

      })
        .then(res => {
          console.log(res);
          // get("/character/:id")
          // setUserContext // but becareful.. might need to account for tasks
        })
        .catch(err => { console.log(err); });
    });
  };

  const handleAddItem = (PowerUpId, PowerUpName) => {
    let CharacterId = userContext.User.User.CharacterId;
    console.log("PWN", PowerUpName)
    console.log("PWI", PowerUpId)
    axios.post(`/api/addinventory/`, { CharacterId, PowerUpId, PowerUpName })
      .then(res => {
        console.log(res);
      })
      .catch(err => { console.log(err); });
  };


  // componentDidMount() {
  //   const { userContext } = useContext(UserContext);
  //   console.log(userContext)
  //   this.setState={user: userContext}
  //   // read this info from the usercontext
  //   //console.log(userContext);
  //   if (this.props.user === "None") {
  //     return
  //   }




  return (
    <div>
      <h4>Inventory:</h4>
      <button onClick={getCharacterPowerups}>Fetch your Items</button>
      <button onClick={getAllInventory}>See all Items</button>
      {inventory ?
        inventory.map(elem =>
          <div>
            <p key={elem.PowerUpName}>{elem.PowerUpName}</p>
            <img src='http://via.placeholder.com/150x150'></img>
            <p>{elem.Description || elem.PowerUp.Description}</p>
            <button onClick={() => handleUseItem(elem.id, elem.PowerUpType || elem.PowerUp.PowerUpType)}>Use Item</button>
            <button onClick={() => handleAddItem(elem.id, elem.PowerUpName, elem.PowerUpType || elem.PowerUp.PowerUpType)}>Add Item to character</button>
            <p>-----</p>
          </div>)
        : <p>loading</p>
      }

      {/* //daves item */}
      {/* <Row className="mt-5">
      <Col className="inventoryItems m-2 p-2 border rounded shadow">
        <div className="align-middle m-1 p-3">
          <img src="https://via.placeholder.com/140x100" alt="shield" />
        </div>
        <div>
          <h3>Item: {itemRef.current.name}</h3>
          <h5>Bonus: {itemRef.current.type === "Health" ? <span>Adds to Health</span> : <span>Removes 1 Task and Gives Experience for it</span>}</h5>
          <Button onClick={() => handleClick(itemRef.current.name)}>Use</Button>
        </div>
      </Col>
    </Row> */}



    </div>
  )


}






// export default function Inventory(props) {
//   const { userContext, setUserContext } = useContext(UserContext)
//   const { itemState, setItemState } = useState()



//   useEffect(()=>{
//       let inventoryVar
//       Axios.get('/api/inventory').then((response)=>{
//         const items = userContext.User.inventory.items
//         return items.map((item)=>{
//             return response.data.filter(element=>{
//               return item===element.id && element
//             })
//         })
//       }).then((inventory)=>{
//         inventoryVar=inventory
//       })
//       console.log(inventoryVar)
//       setItemState(inventoryVar)
//   },[itemState])

//   if (userContext.User === "None") {
//     return <Loading />
//   }

//   return (
//     <div>
//     </div>
//   )
// }