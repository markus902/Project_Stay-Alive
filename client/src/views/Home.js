import React, { useContext } from 'react'
import UserContext from '../utils/UserContext'
import { useAuth0 } from "../react-auth0-spa";
import Welcome from "./Welcome"
import CharacterCreator from "./CharacterCreation"
import CharacterDashboard from "./CharacterDashboard"
import Loading from "../components/Loading"



export default function Home(props) {
  const { userContext, setUserContext } = useContext(UserContext)
  const { isAuthenticated } = useAuth0();

  if (userContext.User === "None") {
    return <Loading />
  }
  return (
    <div>

      {isAuthenticated ?
        userContext.CharacterId === "Space" ? <CharacterCreator /> : <CharacterDashboard />
        :
        <Welcome />}
    </div>
  )
}
