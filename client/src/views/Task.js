import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TaskContext from '../utils/TaskContext';
import UserContext from '../utils/UserContext';
import { useAuth0 } from '../react-auth0-spa';
import axios from 'axios';
import NewTaskForm from '../components/NewTaskForm';
import TaskItemsData from '../components/TaskItemsData';
import Loading from "../components/Loading"
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
        let currentCharacterId = userContext.User.CharacterId;
        axios.get(`/api/character/${currentCharacterId}`)
          .then(response => {
            if (response.data.length >= 1) {
              setUserContext({ User: response.data[0] })
            }
          })
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

  //Handle Removal of Task

  const handleRemove = async (task) => {
    axios.put(`/api/removeTask/${task.id}`, { CharacterId: task.CharacterId })
      .then((response) => {
        setUserContext({ User: response.data[0] })
      })
  }

  // newTaskForm submit button handler
  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    if (userContext.User === "None") {
      return
    }
    let exsistingTasks = userContext.User.ToDoTasks.map(task => task.taskName);
    if (newTaskName === '') {
      alert("Please enter a name for your task")
    }
    if (exsistingTasks.includes(newTaskName)) { // doesn't pay attention to capital letters and needs to be refined further
      alert("Task name already exsists")
    }
    else {
      const newTask = {
        taskName: newTaskName,
        taskNotes: newTaskNotes,
        taskFrequency: newTaskFrequency,
        taskDifficulty: newTaskDifficulty,
        complete: moment("1980-01-01 12:00").format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
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
    let health = userContext.User.health
    let exp = userContext.User.experience
    const currentLvl = Math.floor(userContext.User.experience / 400) + 1
    axios.put(`/api/completeTask/${task.id}`, task)
      .then(res => {
        setUserContext({ User: res.data[0] })
        return res
      }).then((info) => {
        const completedTaskArray = info.data[0].ToDoTasks
        const completed = completedTaskArray.filter((element) => {
          return element.id === task.id
        })
        const updatedTask = completed[0]
        if (updatedTask.complete.split("T")[0] !== "1980-01-01") {
          //creates dates to compare
          const completedAt = moment(updatedTask.complete)
          const created = moment(updatedTask.createdAt)
          //difference
          const hours = completedAt.diff(created, "hours", true)
          //Adds or remvoes Health or Experience
          if (updatedTask.taskFrequency === "Daily") {
            if (hours >= 0 && hours <= 24.00) {
              switch (true) {
                case updatedTask.taskDifficulty === 1:
                  exp += 10;
                  break;
                case updatedTask.taskDifficulty === 2:
                  exp += 20;
                  break;
                case updatedTask.taskDifficulty === 3:
                  exp += 30;
                  break;
                case updatedTask.taskDifficulty === 4:
                  exp += 40
                  break;
                case updatedTask.taskDifficulty === 5:
                  exp += 50
                  break;
                default:
                  break;
              }
            }
            else {
              health -= 10;
              if (health < 0) {
                health = 100;
                exp = exp - 200;
                if (exp < 0) {
                  exp = 0
                }
              }
            }
          }
          else if (updatedTask.taskFrequency === "Weekly") {
            if (hours >= 0 && hours <= 168.00) {
              switch (true) {
                case updatedTask.taskDifficulty === 1:
                  exp += 50;
                  break;
                case updatedTask.taskDifficulty === 2:
                  exp += 60;
                  break;
                case updatedTask.taskDifficulty === 3:
                  exp += 70;
                  break;
                case updatedTask.taskDifficulty === 4:
                  exp += 80
                  break;
                case updatedTask.taskDifficulty === 5:
                  exp += 90
                  break;
                default:
                  break;
              }
            }
            else {
              health -= 20;
              if (health < 0) {
                health = 100;
                exp = exp - 200;
                if (exp < 0) {
                  exp = 0
                }
              }
            }
          }
          else if (updatedTask.taskFrequency === "Monthly") {
            if (hours >= 0 && hours <= 720.00) {
              switch (true) {
                case updatedTask.taskDifficulty === 1:
                  exp += 100;
                  break;
                case updatedTask.taskDifficulty === 2:
                  exp += 110;
                  break;
                case updatedTask.taskDifficulty === 3:
                  exp += 120;
                  break;
                case updatedTask.taskDifficulty === 4:
                  exp += 130
                  break;
                case updatedTask.taskDifficulty === 5:
                  exp += 140
                  break;
                default:
                  break;
              }
            }
            else {
              health -= 30;
              if (health < 0) {
                health = 100;
                exp = exp - 200;
                if (exp < 0) {
                  exp = 0
                }
              }
            }
          }
          console.log(currentLvl)
          console.log(Math.floor(exp / 400) + 1)
          if (Math.floor(exp / 400) + 1 > currentLvl) {
            const randomItem = Math.floor(Math.random() * 19) + 1
            axios.get(`/api/itembyid/${randomItem}`).then((itemData) => {
              console.log(itemData)
              console.log(updatedTask)
              const gift = {
                CharacterId: updatedTask.CharacterId,
                PowerUpId: randomItem,
                PowerUpName: itemData.data.PowerUpName
              }
              console.log(gift)
              axios.post("/api/addinventory/", gift)
            })
          }

          axios.put(`/api/characterLevel/${updatedTask.CharacterId}`, { health: health, exp: exp })
            .then(response => {
              setUserContext({ User: response.data[0] })
            })
        }
      })
  }

  if (userContext.User === "None") {
    return <Loading />
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
            <TaskItemsData tasks={userContext.User.ToDoTasks} handleRemove={handleRemove} handleTaskComplete={handleTaskComplete} />
          </Col>
        </Row>
      </Container>

    </TaskContext.Provider>
  );
};

export default Task;