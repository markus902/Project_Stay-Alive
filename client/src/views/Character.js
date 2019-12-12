import React, { useContext } from "react";
import { Container} from "reactstrap";
import Inventory from "../components/Inventory";
import UserContext from '../utils/UserContext';
import CharacterDashboard from "./CharacterDashboard";



const Profile = () => {
  const { userContext } = useContext(UserContext);

  return (
    <Container className="mb-5">
      <CharacterDashboard />
      <Inventory user={userContext.User} />
    </Container>
  );
};

export default Profile;
