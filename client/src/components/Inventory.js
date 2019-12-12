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



  // then loop through the state of the inventory and create the visual UI of the inventory for the user
  const getCharacterPowerups = () => {
    console.log(userContext.User)
    let currentCharacterId = userContext.User.User.CharacterId;
    axios.get(`/api/inventory/${currentCharacterId}`)
      .then(res => {
        console.log("getting character specific items", res)
        if (res.data.length === 0) {
          alert("You have no items to show or something went wrong");
        }
        else {
          console.log("before set inventory:", res.data);
          setInventory(res.data);
        }
        console.log(inventory);
      });
  };

  const getAllInventory = () => {
    axios.get('/api/inventory/')
      .then(res => {
        console.log("getting full inventory", res)
        if (res.data.length === 0) {
          alert("something went wrong, the inventory is empty");
        }
        else {
          console.log("before set inventory:", res.data);
          setInventory(res.data);
        }
        console.log(inventory);
      });
  };

  const handleUseItem = (PowerUpId, PowerUpType) => {
    let currentCharacterId = userContext.User.User.CharacterId;
    // set loading to true until the axios is done 
    setLoading(true);
    // Pull data to get the user health and experience 
    let health = userContext.User.health;
    let experience = userContext.User.experience;
    let oldUserInventory = userContext.User.CharacterPowerups;
    console.log('oldUserInventory:', oldUserInventory);
    // let userInventory = oldUserInventory.filter((elem) => {
    //   return elem !== PowerUpId;
    // })
    // write logic to add health or experience to that based on the PowerUpType
    if (PowerUpType === "ExperienceBoost") { // PowerUpType ? reward giveHealth : reward giveExperience
      // add experience experience + 50
      experience = experience + 50;
      // check for level up 
    }
    else {
      // add health... health + 25
      health = health + 25;
    }
    // update CharacterPowerUps to remove the item from their inventory
    console.log("itemType:", PowerUpType);
    console.log("PowerUpId:", PowerUpId);
    axios.post(`/api/useItem/:characterId`).then(res => {

    }).then(() => {
      axios.post(`/api/characterupdate/${userContext.User.id}`, {
        characterName: userContext.characterName,
        health: health,
        experience: experience,
        // inventory: userInventory,
        bodyType: userContext.bodyType,
        hairType: userContext.hairType,
        color1: userContext.color1,
        color2: userContext.color2
      })
        .then(res => {
          console.log(res);
          // get("/character/:id")
          // setUserContext but becareful.. might need to account for tasks
        })
        .catch(err => { console.log(err); });
    });
  };

  const handleAddItem = (event) => {
    // axios.post(`/api/`)
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
            <p>{elem.Description || elem.PowerUp.Description}</p>
            <button onClick={() => handleUseItem(elem.id, elem.PowerUpType || elem.PowerUp.PowerUpType)}>Use Item</button>
            <button onClick={() => handleAddItem(elem.PowerUpId, elem.PowerUpType || elem.PowerUp.PowerUpType)}>Add Item to character</button>
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