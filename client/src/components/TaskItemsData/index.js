import React, { useContext } from 'react';
import './style.css';
import { Row, Col } from 'reactstrap';
import TaskContext from '../../utils/TaskContext';
import UserContext from '../../utils/UserContext';
import TaskInfo from "../../components/TaskInfo";

function TaskItemsData(props) {
    const tasks = props.tasks
    return (
        <div className='TaskContainer'>
            <Row>
                <Col>
                    <h1>Your Todo Lists</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <h3>Daily</h3>
                        </Col>
                    </Row>
                    <Row>
                        <h6>To Do:</h6>
                    </Row>
                        {tasks ? 
                        (tasks.map(element=>{
                            return (element.taskFrequency==="Daily" && element.complete === "1980-01-01T17:00:00.000Z") ? 
                            <TaskInfo task={element}  handleTaskComplete={props.handleTaskComplete}/> : 
                            <div></div>
                        })):
                        (
                            <Row>
                                <h5>No Task</h5>
                            </Row>
                        )}
                    <Row>
                        <h6>Completed:</h6>
                    </Row>
                    {tasks ? 
                        (tasks.map(element=>{
                            return (element.taskFrequency==="Daily" && element.complete !== "1980-01-01T17:00:00.000Z") ? 
                            <TaskInfo task={element} handleNewTaskSubmit={props.handleNewTaskSubmit} /> : 
                            <div></div>
                        })):
                        (
                            <Row>
                                <h5>No Task</h5>
                            </Row>
                        )}
                </Col>
                <Col>
                    <h3>Weekly</h3>
                </Col>
                <Col>
                    <h3>Monthly</h3>
                </Col>
            </Row>

        </div>
    )
}

export default TaskItemsData;