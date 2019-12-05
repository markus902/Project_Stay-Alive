import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';
import NewTaskForm from "../components/NewTaskForm";

const Task = () => {
  // const [state, setstate] = useState(initialState)
  const { loading, user } = useAuth0();
 const [newTaskName, setNewTaskName] = useState("")
 const [newTaskNotes, setNewTaskNotes] = useState("")
 const [newTaskDifficulty, setNewTaskDifficulty] = useState(0)
 const [newTaskFrequency, setNewTaskFrequency] = useState(0)
  if (loading || !user) {
    return <Loading />;
  };

 



  handleNewTaskInput = (event) => {
    console.log('set' + event.target.id)
    switch (true) {
      case (event.target.id === 'newTaskName'):
        setNewTaskName(event.target.value)
        break;
      case (event.target.id === 'newTaskNotes'):
        setNewTaskNotes(event.target.value)
        break;
      case (event.target.id === 'newTaskDifficulty'):
        setNewTaskDifficulty(event.target.value)
        break;
      case (event.target.id === 'newTaskFrequency'):
        setNewTaskFrequency(event.target.value)
        break;
      default:
        break;
    }
  }
  // old code
  // let { name, value } = event.target;
  // setTodoTask({ [name]: value, })
  // // this.setState({ todo: event.target.value });
  // console.log(event);
  // };

  handleNewTaskSubmit = () => {
    event.preventDefault();
    console.log('submit', this.state);
    const newTask = {
      newTaskName: newTaskName,
      newTaskNotes: newTaskNotes,
      newTaskDifficulty: newTaskDifficulty,
      newTaskFrequency: newTaskFrequency,
      taskId: taskId
    }
      axios.post('/api/adcreatetask/:taskId', newTask).then(response => {
        console.log(response)
        // setFirstTime(false)
      })
  }



  return (
    <Container className="mb-5">

      <Row>
        <Col>
          Task Data
        </Col>
        <Col>
          <NewTaskForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Task;
