import React, { useContext } from 'react';
import './style.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import TaskContext from '../../utils/TaskContext';
import UserContext from '../../utils/UserContext';
import DailyTasks from './DailyTasks';
import WeeklyTasks from './WeeklyTasks';
import MonthlyTasks from './MonthlyTasks';

function TaskItemsData() {
    const context = useContext(TaskContext);
    const { userContext, setUserContext } = useContext(UserContext);

    // let dbTaskNames = userContext.User.ToDoTasks.map(task => task.taskName);
    // console.log(dbTaskNames);
    // let dbTaskNotes = userContext.User.ToDoTasks.map(task => task.taskNotes);
    // console.log(dbTaskNotes);
    // let dbDailyTasks = userContext.User.ToDoTasks.filter(task => task.taskFrequency === 'Daily');
    // console.log(dbDailyTasks);
    // let dbWeeklyTasks = userContext.User.ToDoTasks.filter(task => task.taskFrequency === 'Weekly');
    // console.log(dbWeeklyTasks);
    // let dbMonthlyTasks = userContext.User.ToDoTasks.filter(task => task.taskFrequency === 'Monthly');
    // console.log(dbMonthlyTasks);





    return (
        <div className='TaskContainer'>
            <Row>
                <Col>
                    <h1>Your Todo Lists</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DailyTasks />
                </Col>
                <Col>
                    <WeeklyTasks />
                </Col>
                <Col>
                    <MonthlyTasks />
                </Col>
            </Row>
        </div>
    )
}

export default TaskItemsData;