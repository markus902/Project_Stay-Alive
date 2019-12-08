import React, { useState, useRef, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TaskContext from '../utils/TaskContext';
import UserContext from '../utils/UserContext';
import Loading from '../components/Loading';
import { useAuth0 } from '../react-auth0-spa';
import axios from 'axios';
import NewTaskForm from '../components/NewTaskForm';
import TaskItemsData from '../components/TaskItemsData';
import { array } from 'prop-types';

const Task = () => {
  // const [state, setstate] = useState(initialState);
  const { isAuthenticated } = useAuth0();
  const { userContext, setUserContext } = useContext(UserContext);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskNotes, setNewTaskNotes] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('');
  const [newTaskFrequency, setNewTaskFrequency] = useState('');

  // Get Task Data from DB

  const getTaskData = () => {
    if (isAuthenticated) {
      if (userContext.User.ToDoTasks.length != 0) {
        console.log("get that character stuff", userContext);
        console.log("Getting task data from DB", userContext.User.ToDoTasks);
        let currentCharacterId = userContext.User.User.CharacterId;
        console.log(currentCharacterId);
        axios.get(`/api/gettasks/${currentCharacterId}`)
          .then(response => {
            console.log("TASKS FROM DB in response", response)
          })
      };
    };
  };
  useEffect(() => {
    // console.log(userContext);
    if (isAuthenticated) {
      getTaskData();
    }
  }, [userContext])



  // newTaskForm input change handler
  const handleNewTaskInput = (event) => {
    console.log(event.target.id)
    console.log(event.target)
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
      // axios.get(`/api/getuserbyusername/${userContext.User.User.userName}`).then(response => {
      // console.log(response);
      const newTask = {
        taskName: newTaskName,
        taskNotes: newTaskNotes,
        taskFrequency: newTaskFrequency,
        taskDifficulty: newTaskDifficulty,
        complete: "1980-01-01 12:00",
        CharacterId: userContext.User.User.CharacterId
      }
      console.log(newTask);
      axios.post('/api/createtask', newTask).then(response => {
        console.log(response);
        // setFirstTime(false)
      })
    }
  };



  return (
    <TaskContext.Provider
      value={{ newTaskName, newTaskNotes, newTaskDifficulty, newTaskFrequency, handleNewTaskInput, handleNewTaskSubmit }}
    >
      <h1>{JSON.stringify(TaskContext.value)}</h1>

      <Container className='mb-5'>

        <Row>
          <Col>
            <h1>Task Data Manager</h1>
            {/* <h2>{JSON.stringify(userContext)}</h2> */}
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