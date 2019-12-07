import React, { useContext } from 'react';
import './style.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import TaskContext from '../../utils/TaskContext';

function TaskDataView() {
    const context = useContext(TaskContext);
    console.log(context.newTaskName);

    return (
        <div className='TaskContainer'>
            
        </div>
    )
}

export default TaskDataView;