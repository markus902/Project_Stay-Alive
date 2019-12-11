import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../utils/UserContext'
import { Row, Col, Button } from "reactstrap";
import Loading from "./Loading";
import axios from 'axios';




export default function Inventory() {
  const { userContext, setUserContext } = useContext(UserContext);
  const [inventory, setInventory] = useState([]);
  const [item, setItem] = useState([]);

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

  useEffect(() => {
    // console.log(inventory);
  }, [inventory]);
  useEffect(() => {
    // console.log(inventory);
  }, [item]);


  // then loop through the state of the inventory and create the visual UI of the inventory for the user
  const getCharacterPowerups = () => {
    let currentCharacterId = userContext.User.User.CharacterId;
    axios.get(`api/inventory/${currentCharacterId}`)
      .then(res => {
        console.log("getting character specific items", res)
        if (res.data.length === 0) {
          alert("You have no items to show or something went wrong");
        }
        else { setInventory(res.data); }

      });
  };

  const handleUseItem = (event) => {
    let itemType = event.target.id;
    this.setItem(itemType);
    console.log(this.state.item);
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
      {inventory !== [] ?
        inventory.map(elem =>
          <div>
            <p key={elem.PowerUpName}>{elem.PowerUpName}</p>
            <p>{elem.PowerUp.Description}</p>
            <button id={elem.PowerUpId} itemType={elem.PowerUp.PowerUpType} onClick={handleUseItem}>Use Item</button>
            <p>{elem.PowerUp.PowerUpType}</p>
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