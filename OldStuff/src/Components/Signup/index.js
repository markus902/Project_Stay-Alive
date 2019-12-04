/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
// import { Face, Fingerprint } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));


function SignUp(props) {
  const [user, setUser] = useState(props.user)
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [username, setUsername] = useState(user.username);
  const [userFound, setUserFound] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios.get(`/api/getuserbyusername/${username}`).then((data) => {
      if (data.data[0]) {
        setUserFound(true)
      }
    })
  })

  const setUserConfig = () => {
    const newUser = {
      email: email,
      username: username,
      password: password,
      lastName: lastName,
      firstName: firstName
    }
    setUser(newUser)
  }

  const handleChangeFirstName = event => {
    setFirstName(event.target.value);
  };
  const handleChangeLastName = event => {
    setLastName(event.target.value);

  };
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };
  const handleClick = () => {
    console.log("Verify Click User:")
    console.log(user)
    axios.post('/api/user', user).then(data => { console.log(data.data[0]) }).catch(err => console.log(err))
  }

  return (
    userFound ?
      <Redirect to="/" />
      :
      <div className={classes.container}>
        <Typography> Please Verify your Information so that we can make sure we have everything correct: </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input id="firstName" value={firstName} onChange={handleChangeFirstName} onKeyUp={setUserConfig} />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="lastName">Last Name:</InputLabel>
          <Input id="lastName" value={lastName} onChange={handleChangeLastName} onKeyUp={setUserConfig} />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="email">Email:</InputLabel>
          <Input id="email" value={email} onChange={handleChangeEmail} onKeyUp={setUserConfig} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="username">Username:</InputLabel>
          <Input id="username" value={username} onChange={handleChangeUsername} onKeyUp={setUserConfig} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="password">Please enter password:</InputLabel>
          <Input id="password" value={password} onChange={handleChangePassword} onKeyUp={setUserConfig} />
        </FormControl>
        <Button onClick={handleClick}>Verify</Button>
      </div>
  )
}

export default SignUp;