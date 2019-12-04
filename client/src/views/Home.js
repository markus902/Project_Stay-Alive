import React, { Fragment } from "react";
import axios from 'axios';
import { useAuth0 } from "../react-auth0-spa";

const Home = () => {
  const { loading, user } = useAuth0();

  if (user) {
    const userData={
      username: user.nickname,
      email:user.email,
      lastLogin:new Date()
    }
    axios.post('/api/adduser', userData).then(data=>{
      console.log(data)
    }).catch(err=>console.log(err))
  }

  return(
    <div>HI</div>
  )
};

export default Home;
