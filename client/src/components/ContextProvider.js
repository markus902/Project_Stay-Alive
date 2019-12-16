import React, {useState,useEffect} from 'react'
import UserContext from '../utils/UserContext'
import Axios from 'axios'
import { useAuth0 } from "../react-auth0-spa";


export default function ContextProvider({children}) {
    const { user, isAuthenticated } = useAuth0();
    const [userContext,setUserContext] = useState({User: "None"})

    const getUserData = async(userData)=>{
        let res = await Axios.post('/api/adduser', userData)
        if(res.data.CharacterId){
            let char = await Axios.get(`/api/character/${res.data.CharacterId}`)
            setUserContext({User: char.data[0]})
        }
        else{
            setUserContext({User: res.data, CharacterId: "Space"})
        }

    }

    useEffect(()=>{
        let userData = {}
        if(isAuthenticated){
            userData = {
                username: user.nickname,
                email: user.email,
                lastLogin: new Date()
              }
              getUserData(userData);
        }
    }, [setUserContext,isAuthenticated,user])

    return (
        <UserContext.Provider value={{userContext,setUserContext}}>{children}</UserContext.Provider>
    )
}