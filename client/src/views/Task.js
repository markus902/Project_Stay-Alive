import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TaskContext from '../utils/TaskContext';
import Loading from '../components/Loading';
import { useAuth0 } from '../react-auth0-spa';
import axios from 'axios';
import NewTaskForm from '../components/NewTaskForm';
import TaskItemsData from '../components/TaskItemsData';
import { array } from 'prop-types';


const Task = () => {
  // const [state, setstate] = useState(initialState)
  const { loading, user } = useAuth0();
  const [onLoad, setOnLoad] = useState(false)
  // const userRef = useRef(0)
  // const charRef = useRef({ CharacterId: 0 })
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskNotes, setNewTaskNotes] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState(1);
  const [newTaskFrequency, setNewTaskFrequency] = useState('Daily');

  // THIS IS FAKING IT FOR NOW - get current user characterId 
     // need to make this an api call like on lines 24-40 above. 
  const getCurrentCharacterId = () => {
    let currentCharacterId = 1;
   
  };
  // get task data from DB
  const getTaskData = () => {
    console.log("Getting task data from DB");
    let currentCharacterId = 1; // this should be using getCurrentCharacterId 
    // so that the value is dynamic depending on who is logged in
    axios.get(`/api/gettasks/${currentCharacterId}`)
      .then(response => {
        console.log("TASKS FROM DB", response)
      })
  };

  if (loading || !user) {
    return <Loading />;
  };
  if (!onLoad && user) {
    setOnLoad(true);
    // getCurrentCharacterId();
    getTaskData();
  };
  // if (!onLoad && user) {
  //   axios.get(`/api/getuserbyusername/${user.nickname}`).then(response => {
  //     userRef.current = response.data[0]
  //     charRef.current = userRef.current.CharacterId
  //   }).then(() => {
  //     if (charRef.current.CharacterId !== 0) {
  //       axios.get(`/api/character/${charRef.current}`).then(response => {
  //         charRef.current = response.data[0]
  //         console.log(charRef.current)
  //         setOnLoad(true)
  //       })
  //     }
  //   }).catch(err => console.log(err))
  // };


  // newTaskForm input change handler
  const handleNewTaskInput = (event) => {
    console.log(event.target.id)
    console.log('set' + event.target.value)
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
  };

  // newTaskForm submit button handler
  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (newTaskName === '') {
      // display alert
      alert("Please enter a name for your task")
    }
    else {
      console.log('submit');
      axios.get(`/api/getuserbyusername/${user.nickname}`).then(response => {
        console.log(response);
        const newTask = {
          taskName: newTaskName,
          taskNotes: newTaskNotes,
          taskDifficulty: newTaskDifficulty,
          frequency: newTaskFrequency,
          complete: "1980-01-01 12:00",
          CharacterId: response.data[0].CharacterId
        }
        console.log(newTask);
        axios.post('/api/createtask', newTask).then(response => {
          console.log(response);
          // setFirstTime(false)
        })
      })
    }
  };



  return (
    <TaskContext.Provider
      value={{ newTaskName, newTaskNotes, newTaskDifficulty, newTaskFrequency, handleNewTaskInput, handleNewTaskSubmit }}
    >

      <Container className='mb-5'>

        <Row>
          <Col>
            <h1>Task Data Manager</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <NewTaskForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <TaskItemsData />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            {array.filter(task => task.frequency === "Daily").map(taskDaily =>
              <TaskItemsData 
              data = {taskDaily}/>)}
          </Col>
          <Col>
            {array.filter(task => task.frequency === "Weekly").map(taskWeekly =>
              <TaskItemsData />)}
          </Col>
          <Col>
            {array.filter(task => task.frequency === "Monthly").map(taskMonthly =>
              <TaskItemsData />)}
          </Col>
        </Row> */}
      </Container>

    </TaskContext.Provider>
  );
};

export default Task;