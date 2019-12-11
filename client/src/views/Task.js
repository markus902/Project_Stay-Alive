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


  // Get Task Data from userContext and from DB response at /api/gettasks/${currentCharacterId}
  const getTaskData = () => {
    // if (isAuthenticated) {
    // if (userContext.User.ToDoTasks.length != 0) {
    // if (userContext.User.ToDoTasks != 0) {
    console.log("userContext: ", userContext);
    console.log("TaskContext: ", TaskContext);
    console.log("Task data from userContext.User.ToDoTasks: ", userContext.User.ToDoTasks);
    let currentCharacterId = userContext.User.User.CharacterId;
    console.log("currentCharacterId: ", currentCharacterId);
    axios.get(`/api/gettasks/${currentCharacterId}`)
      .then(response => {
        console.log("TASKS FROM DB in axios getTaskData response: ", response);
        axios.get(`/api/character/${response.CharacterId}`)
          .then((response) => {
            setUserContext({ user: response.data })
          })
      })
    // };
    // };
  };

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
    let exsistingTasks = userContext.User.ToDoTasks.map(task => task.taskName);
    console.log(exsistingTasks);
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
        return res
      }).then((info) => {
        const completedTaskArray = info.data[0].ToDoTasks
        const completed = completedTaskArray.filter((element)=>{
            return element.id===task.id
        })
        console.log(completed)
        switch (true) {
          case task.taskFrequency === "Daily":
            if(completed.complete!=="1980-01-01T17:00:00.000Z"){
              const completedAt = moment(new Date(completed[0].complete))
              const created = moment(new Date(completed[0].createdAt))
              const hours = completedAt.diff(created, "hours",true)
              console.log("completed at " + moment(completedAt).format("MM/DD/YY HH:mm"))
              console.log("created at " + moment(created).format("MM/DD/YY HH:mm"))
              if(hours>0 && hours<=24.00){
                const itemId = Math.random()*20 + 1;
                let exp=0;
                switch(true){
                  case completed[0].taskDifficulty===1:
                  exp=10;
                  break;
                  case completed[0].taskDifficulty===2:
                  exp=20;
                  break;
                  case completed[0].taskDifficulty===3:
                  exp=30;
                  break;
                  case completed[0].taskDifficulty===4:
                  exp=40
                  break;
                  case completed[0].taskDifficulty===5:
                  exp=50
                  break;
                  default:
                    break;
                }
                //update experience

                //update Inventory

                //set UserContext
              }
              else{
                console.log("out of Time")
              }
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

  if (userContext.User === "None") {
    // return isAuthenticated ? <Loading /> : <Welcome />
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
            <TaskItemsData tasks={userContext.User.ToDoTasks} handleTaskComplete={handleTaskComplete} />
          </Col>
        </Row>
      </Container>

    </TaskContext.Provider>
  );
};

export default Task;