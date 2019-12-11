import React, { useContext } from 'react';
import './style.css';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import TaskContext from '../../utils/TaskContext';




function NewTaskForm() {
    const context = useContext(TaskContext);


    return (
        <div className='newTaskContainer'>
            <Row>
                <Col>
                    <h4>Add a New Task</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className='newTask' onSubmit={context.handleNewTaskSubmit}>
                        <Row>

                            <Col xs={12} md={6}>
                                <FormGroup>
                                    <Label for='taskname'>Enter your Task name: </Label>
                                    <Input
                                        className='newTaskName'
                                        id='newTaskName'
                                        onChange={e => context.handleNewTaskInput(e)}
                                        type='value'></Input>
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormGroup>
                                    <Label for='taskNotes'>Enter your Task Notes: </Label>
                                    <Input
                                        className='newTaskNotes'
                                        id='newTaskNotes'
                                        onChange={e => context.handleNewTaskInput(e)}
                                        type='value'></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <FormGroup>
                                    <Label className='newTaskDifficulty' for='difficulty-choice'>Choose a Difficulty: </Label>
                                    <Input type="select" id='newTaskDifficulty' onChange={e => context.handleNewTaskInput(e)}>
                                        <option defautlValue='1'>Menial</option>
                                        <option value='2'>Easy</option>
                                        <option value='3'>Medium</option>
                                        <option value='4'>Hard</option>
                                        <option value='5'>Challenging</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col  xs={12} md={6}>
                                <FormGroup>
                                    <Label className='newTaskFrequency' for='frequency-choice'>Choose a Frequency:</Label>
                                    <Input type="select" id='newTaskFrequency' onChange={e => context.handleNewTaskInput(e)}>
                                        <option defautlValue='Daily'>Daily</option>
                                        <option value='Weekly'>Weekly</option>
                                        <option value='Monthly'>Monthly</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Col>
                            <Button type='submit'>Add Task Item</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </div >
    )
}

export default NewTaskForm;