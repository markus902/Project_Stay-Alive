import React, { useContext } from 'react'
import UserContext from '../utils/UserContext'
import { useAuth0 } from "../react-auth0-spa";
import Welcome from "./Welcome"
import CharacterCreator from "./CharacterCreation"



export default function Home(props) {
  const { userContext, setUserContext } = useContext(UserContext)
  const { isAuthenticated } = useAuth0();

  return (
    <div>

      {isAuthenticated ?
        userContext.CharacterId==="Space" ? <CharacterCreator/> : <div> {JSON.stringify(userContext)}</div>
        :
        <Welcome />}
    </div>
  )
}
