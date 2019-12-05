import React, { useRef } from "react";
// import Axios from 'axios'
import { Row, Col, Button } from "reactstrap";



export default function Inventory(props) {
  const itemRef = useRef()
  const getItemInfo = () => {
    return {
      name: "Shield",
      type: "Health",
      used: false
    }
  }

  itemRef.current = getItemInfo();
  const handleClick = (itemName) => {
    console.log(itemName)
  }

  return (
    <Row className="mt-5">
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
      <Col className="inventoryItems m-2 p-2 border rounded shadow">
        <div className="align-middle m-1 p-3">
          <img src="https://via.placeholder.com/140x100" alt="shield"/>
        </div>
        <div>
          <h3>Item: {itemRef.current.name}</h3>
          <h5>Bonus: {itemRef.current.type === "Health" ? <span>Adds to Health</span> : <span>Removes 1 Task and Gives Experience for it</span>}</h5>
          <Button onClick={() => handleClick(itemRef.current.name)}>Use</Button>
        </div>
      </Col>
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
      <Col className="inventoryItems m-2 p-2 border rounded shadow">
        <div className="align-middle m-1 p-3">
          <img src="https://via.placeholder.com/140x100" alt="shield"/>
        </div>
        <div>
          <h3>Item: {itemRef.current.name}</h3>
          <h5>Bonus: {itemRef.current.type === "Health" ? <span>Adds to Health</span> : <span>Removes 1 Task and Gives Experience for it</span>}</h5>
          <Button onClick={() => handleClick(itemRef.current.name)}>Use</Button>
        </div>
      </Col>
    </Row>
  )
}
