import React, { useContext } from 'react';
import './style.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import TaskContext from '../../utils/TaskContext';
import UserContext from '../../utils/UserContext';
import { element } from 'prop-types';

function DailyTasks() {
    const context = useContext(TaskContext);
    const { userContext, setUserContext } = useContext(UserContext);

    let dbTaskNames = userContext.User.ToDoTasks.map(task => task.taskName);
    console.log(dbTaskNames);
    let dbTaskNotes = userContext.User.ToDoTasks.map(task => task.taskNotes);
    console.log(dbTaskNotes);
    let dbDailyTasks = userContext.User.ToDoTasks.filter(task => task.taskFrequency === 'Daily');
    console.log(dbDailyTasks);



    return (
        <div className='TaskContainer'>
            <Row>
                <Col>
                    <h3>Daily Tasks</h3>
                    <div >
                        {/* {JSON.stringify(dbDailyTasks)} */}
                        {dbDailyTasks.map(element => {
                            return (<div id='DailyCards' className='card'>
                            <p><strong>Name: </strong>{element.taskName}</p>
                            <p><strong>Notes: </strong>{element.taskNotes}</p>
                            <p><strong>Difficulty: </strong>{element.taskDifficulty}</p>
                            <p><strong>CreatedAt: </strong>{element.createdAt}</p>
                            <p><strong>UpdatedAt: </strong>{element.updatedAt}</p>
                            <Button id='deleteTaskBtn' onClick={context.deleteTask}>Delete</Button>
                            <Button id='completeTaskBtn' onClick={context.completeTask}>Complete</Button>
                        </div>)
                        })}
                        {/* <p>{dbTaskNames}</p>
                        <p>{dbTaskNotes}</p> */}
                        {/* <button id='completeTaskBtn' onClick={context.completeTask}></button> */}
                        

                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DailyTasks;