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
  const [newTaskDifficulty, setNewTaskDifficulty] = useState(1);
  const [newTaskFrequency, setNewTaskFrequency] = useState('Daily');

  useEffect(() => {
    if (isAuthenticated) {
      // getTaskData();
    }
  }, [userContext])


  // Get Task Data from userContext and from DB response at /api/gettasks/${currentCharacterId}
  const getTaskData = () => {
    // if (isAuthenticated) {
    // if (userContext.User.ToDoTasks.length != 0) {
    // if (userContext.User.ToDoTasks != 0) {
    console.log("userContext: ", userContext);
    console.log("Task data from userContext.User.ToDoTasks: ", userContext.User.ToDoTasks);
    let currentCharacterId = userContext.User.User.CharacterId;
    console.log("currentCharacterId: ", currentCharacterId);
    axios.get(`/api/gettasks/${currentCharacterId}`)
      .then(response => {
        console.log("TASKS FROM DB in axios getTaskData response: ", response)
      })
    // };
    // };
  };

  // newTaskForm input change handler
  const handleNewTaskInput = (event) => {
    // console.log('set ' + event.target.value);
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
    let exsistingTasks = userContext.User.ToDoTasks.map(task => task.taskName);
    console.log(exsistingTasks);
    if (newTaskName === '') {
      alert("Please enter a name for your task")
    }
    if (exsistingTasks.includes(newTaskName)) { // doesn't pay attention to capital letters and needs to be refined further
      alert("Task name already exsists")
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
        console.log("response from submit: ", response);
        getTaskData();
      })
    }
  };

  // complete task btn
  const completeTask = (event) => {
    // event.preventDefault();
    // check last completed date FUNC check lastCompletedDate
    // check difficulty level FUNC checkTaskDifficulty
    // award experience
    alert("task completed");
  };

  // deleteTaskBtn
  const deleteTask = (event) => {
    // event.preventDefault();
    let currentCharacterId = userContext.User.User.CharacterId;
    axios.get(`/api/gettasks/${currentCharacterId}`)
      .then(response => {
        console.log("TASKS FROM DB in axios getTaskData response: ", response);
        
        let taskId = 21; //to fake it for now, needs to get the id dynamically // let taskId = response.data[].id; 
        axios.post(`api/deletetask/${taskId}`).then(response => {
          console.log("response from delete: ", response);
          getTaskData();
        })
      })
  }


  if (userContext.User === "None") {
    // return isAuthenticated ? <Loading /> : <Welcome />
    return <Loading />
  }

  return (
    <TaskContext.Provider
      value={{ newTaskName, newTaskNotes, newTaskDifficulty, newTaskFrequency, handleNewTaskInput, handleNewTaskSubmit, completeTask, deleteTask}}
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
        <Row>
          <Col>
            {/* {userContext.User.ToDoTasks.filter(task => task.taskFrequency === "Daily").map(taskDaily =>
              <TaskItemsData 
              data = {taskDaily}/>)}
          </Col>
          <Col>
            {userContext.User.ToDoTasks.filter(task => task.taskFrequency === "Weekly").map(taskWeekly =>
              <TaskItemsData />)}
          </Col>
          <Col>
            {userContext.User.ToDoTasks.filter(task => task.taskFrequency === "Monthly").map(taskMonthly =>
              <TaskItemsData />)} */}
          </Col>
        </Row>
      </Container>

    </TaskContext.Provider>
  );
};

export default Task;