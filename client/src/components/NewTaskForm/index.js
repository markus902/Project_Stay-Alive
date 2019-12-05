import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';


function NewTaskForm(props) {

    return (
        <div className='newTaskContainer'>
            <form className='newTask' onSubmit={props.handleNewTaskSubmit}>
                <label for='taskname'>Enter your Task name: </label>
                <input
                    className='newTaskName'
                    onChange={props.handleNewTaskInput}
                    type='text'></input>
                <label for='taskNotes'>Enter your Task Notes: </label>
                <input
                    className='newTaskNotes'
                    handleNewTaskInput={props.handleNewTaskInput}
                    type='text'></input>

                <label 
                className='taskDifficulty'
                for='difficulty-choice'>Choose a Difficulty:
          <select value={this.state.value} onChange={this.handleChange}>
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
          <select value={this.state.value} onChange={this.handleChange}>
                        <option value='Daily'>Daily</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                    </select>
                </label>

                <button type='submit'>Add Task Item</button>
            </form>
        </div>
    )
}

export default NewTaskForm;