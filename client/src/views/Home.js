import React, { useContext } from 'react'
import UserContext from '../utils/UserContext'
import { useAuth0 } from "../react-auth0-spa";
import Welcome from "./Welcome"



export default function Home(props) {
  const { userContext, setUserContext } = useContext(UserContext)
  const { isAuthenticated } = useAuth0();

  return (
    <div>

      {isAuthenticated ?
        userContext.CharacterId==="Space" ? <div>NoCharacter</div> : <div> {JSON.stringify(userContext)}</div>
        :
        <Welcome />}
    </div>
  )
}
