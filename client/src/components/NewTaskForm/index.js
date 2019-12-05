import React, { useContext } from 'react';
import './style.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import TaskContext from '../../utils/TaskContext';




function NewTaskForm() {
    const context = useContext(TaskContext);
    console.log(context.newTaskName);

    return (
        <div className='newTaskContainer'>
            <Form className='newTask' onSubmit={context.handleNewTaskSubmit}>
                <label for='taskname'>Enter your Task name: </label>
                <input
                    className='newTaskName'
                   // value={context.newTaskName}
                    onChange={e  => context.handleNewTaskInput(e)}
                    type='text'></input>
                <label for='taskNotes'>Enter your Task Notes: </label>
                <input
                    className='newTaskNotes'
                    //value={context.newTaskNotes}
                    onChange={e => context.handleNewTaskInput(e)}
                    type='text'></input>

                <label
                    className='taskDifficulty'
                    for='difficulty-choice'>Choose a Difficulty:
          <select onChange={context.handleNewTaskInput()}>
                        <option value='1'>Menial</option>
                        <option value='2'>Easy</option>
                        <option value='3'>Medium</option>
                        <option value='4'>Hard</option>
                        <option value='5'>Challenging</option>
                    </select>
                </label>

                <label
                    className='taskFrequency'
                    for='frequency-choice'>Choose a Frequency:
          <select value={context.newTaskFrequency} onChange={context.handleNewTaskInput()}>
                        <option value='Daily'>Daily</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                    </select>
                </label>

                <Button type='submit' onClick={context.handleNewTaskSubmit}>Add Task Item</Button>
            </Form>
        </div>
    )
}

export default NewTaskForm;