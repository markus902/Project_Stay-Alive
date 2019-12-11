import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TaskContext from '../utils/TaskContext';
import UserContext from '../utils/UserContext';
import { useAuth0 } from '../react-auth0-spa';
import axios from 'axios';
import NewTaskForm from '../components/NewTaskForm';
import TaskItemsData from '../components/TaskItemsData';
import moment from 'moment'

const Task = () => {
  // const [state, setstate] = useState(initialState);
  const { isAuthenticated } = useAuth0();
  const { userContext, setUserContext } = useContext(UserContext);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskNotes, setNewTaskNotes] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState(1);
  const [newTaskFrequency, setNewTaskFrequency] = useState('Daily');

  // Get Task Data from DB

  useEffect(() => {
    if (isAuthenticated) {
      if (userContext.User !== "None") {
        if (userContext.User.ToDoTasks !== undefined) {
          let currentCharacterId = userContext.User.User.CharacterId;
          axios.get(`/api/gettasks/${currentCharacterId}`)
            .then(response => {
              setUserContext({User:response.data[0]})
            })
        };
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  // newTaskForm input change handler
  const handleNewTaskInput = (event) => {
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
      const newTask = {
        taskName: newTaskName,
        taskNotes: newTaskNotes,
        taskFrequency: newTaskFrequency,
        taskDifficulty: newTaskDifficulty,
        complete: "1980-01-01 12:00",
        CharacterId: userContext.User.User.CharacterId
      }
      axios.post('/api/createtask', newTask).then(response => {
        axios.get(`/api/character/${response.data[0].CharacterId}`).then((res) => {
          setUserContext({ User: res.data[0] })
        })
      })
    }
  };

  const handleTaskComplete = (task) => {
    axios.put(`/api/completeTask/${task.id}`, task)
      .then(res => {
        setUserContext({ User: res.data[0] })
      }).then(() => {
        switch (true) {
          case task.taskFrequency === "Daily":
            console.log("Daily Check")
            if (task.complete !== "1980-01-01T17:00:00.000Z") {
              console.log("time check")
              console.log(moment("1980-01-01T17:00:00.000Z"))
            }

            break;
          case task.taskFrequency === "Weekly":
            console.log("Weekly Check")
            break;
          case task.taskFrequency === "Monthly":
            console.log("Monthly Check")
            break;

          default:
            break;
        }
      })
  }

  return (
    <TaskContext.Provider
      value={{ newTaskName, newTaskNotes, newTaskDifficulty, newTaskFrequency, }}
    >
      <h1>{JSON.stringify(TaskContext.value)}</h1>

      <Container className='mb-5'>

        <Row>
          <Col>
            <h1>Task Data Manager</h1>

          </Col>
        </Row>
        <Row>
          <Col>
            <NewTaskForm handleNewTaskInput={handleNewTaskInput} handleNewTaskSubmit={handleNewTaskSubmit} />
          </Col>
        </Row>
        <Row>
          <Col>
            <TaskItemsData tasks={userContext.User.ToDoTasks} handleTaskComplete={handleTaskComplete} />
          </Col>
        </Row>
      </Container>

    </TaskContext.Provider>
  );
};

export default Task;