import React, { useState, useRef, useContext } from "react";
import { Container, Row, Col } from "reactstrap";
import Inventory from "../components/Inventory";
import UserContext from '../utils/UserContext';


const Profile = () => {
  const {userContext,setUserContext} = useContext(UserContext);

  return (
    <Container className="mb-5">
      {JSON.stringify(userContext)}
    </Container>
  );
};

export default Profile;
