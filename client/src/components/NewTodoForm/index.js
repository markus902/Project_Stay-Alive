import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

function NewTaskForm(props) {
    return (
        <div className='newTaskContainer'>
            <form className='newTask' onSubmit={(event) => this.submitTask(event)}>
                <label for="taskname">Enter your Task name: </label>
                <input
                    className='newTaskName'
                    onChange={this.handleNewTaskInput}
                    type='text'></input>
                <label for="taskdescription">Enter your Task Description: </label>
                <input
                    className='newTaskDescription'
                    handleNewTaskInput={this.handleNewTaskInput}
                    type='text'></input>

                <label for="difficulty-choice">Choose a Difficulty:
          <select value={this.state.value} onChange={this.handleChange}>
                        <option value="1">Menial</option>
                        <option value="2">Easy</option>
                        <option value="3">Medium</option>
                        <option value="4">Challenging</option>
                        <option value="5">Hard</option>
                    </select>
                </label>

                <button type='submit'>Add Task Item</button>
            </form>
        </div>
    )
}

export default NewTodoForm;