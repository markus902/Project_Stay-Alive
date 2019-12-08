import React, { useContext } from 'react';
import './style.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import TaskContext from '../../utils/TaskContext';

function TaskItemsData() {
    const context = useContext(TaskContext);
    console.log(context.newTaskName);

    return (
        <div className='TaskContainer'>
            <Row>
                <Col>
                    <h1>Your Todo Lists</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Daily</h3>
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