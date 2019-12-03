import React from 'react';

class AddTodo extends React.Component {
    constructor() {
        super();
        this.state = {
            todo: ''
        };
    }
    render() {
        <div className='addTodoContainer'>
            <form onSubmit={(event) => this.submitTodo(event)}>
                <input onChange={(event) => this.todoInput(event)} type='text'></input>
                <button type='submit'>Add Todo</button>
            </form>
        </div>
    }

    updateTodoInput = (event) => {
        this.setState({ todo: event.target.value });
        console.log(event);
    }
    submitTodo = (event) => {
        event.preventDefault();
        console.log('submit', this.state);
    }
}

export default AddTodo;