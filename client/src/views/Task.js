import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TaskContext from '../utils/TaskContext';
import Loading from '../components/Loading';
import { useAuth0 } from '../react-auth0-spa';
import axios from 'axios';
import NewTaskForm from '../components/NewTaskForm';
import { array } from 'prop-types';

const Task = () => {
  // const [state, setstate] = useState(initialState)
  const { loading, user } = useAuth0();
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskNotes, setNewTaskNotes] = useState('')
  const [newTaskDifficulty, setNewTaskDifficulty] = useState(1)
  const [newTaskFrequency, setNewTaskFrequency] = useState('Daily')


  if (loading || !user) {
    return <Loading />;
  };



const  handleNewTaskInput = (event) => {
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
  }
  // old code
  // let { name, value } = event.target;
  // setTodoTask({ [name]: value, })
  // // this.setState({ todo: event.target.value });
  // console.log(event);
  // };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    const newTask = {
      taskName: newTaskName,
      taskNotes: newTaskNotes,
      taskDifficulty: newTaskDifficulty,
      frequency: newTaskFrequency
    }
    console.log(newTask);
    axios.post('/api/createtask', newTask).then(response => {
      console.log(response)
      // setFirstTime(false)
    })
  }



  return (
    <TaskContext.Provider
      value={{ newTaskName, newTaskNotes, newTaskDifficulty, newTaskFrequency, handleNewTaskInput, handleNewTaskSubmit }}
    >

      <Container className='mb-5'>

        <Row>
          <Col>
            Task Data
        </Col>
          <Col>
            <NewTaskForm />
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