import React from 'react';
import './style.css';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';




function NewTaskForm(props) {
    return (
        <div className='newTaskContainer'>
            <Row>
                <Col>
                    <h4>Add a New Task</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className='newTask' onSubmit={props.handleNewTaskSubmit}>
                        <Row>

                            <Col xs={12} md={6}>
                                <FormGroup>
                                    <Label for='taskname'>Enter your Task name: </Label>
                                    <Input className='newTaskName' id='newTaskName' type='value' onChange={props.handleNewTaskInput}></Input>
                                </FormGroup>
                            </Col>
                            <Col xs={12} md={6}>
                                <FormGroup>
                                    <Label for='taskNotes'>Enter your Task Notes: </Label>
                                    <Input className='newTaskNotes' id='newTaskNotes' type='value'onChange={props.handleNewTaskInput}></Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <FormGroup>
                                    <Label className='newTaskDifficulty' for='difficulty-choice'>Choose a Difficulty: </Label>
                                    <Input type="select" id='newTaskDifficulty' onChange={props.handleNewTaskInput}>
                                        <option defaultValue='1'>Menial</option>
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
                                    <Input type="select" id='newTaskFrequency' onChange={props.handleNewTaskInput}>
                                        <option defaultValue='Daily'>Daily</option>
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