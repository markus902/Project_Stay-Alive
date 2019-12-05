import React from "react";
import { Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';
import AddTodoTask from "../components/NewTodoForm";

const Task = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  };

  state = {
    todoTask: ''
  };


  handleNewTaskInput = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value, })
    // this.setState({ todo: event.target.value });
    console.log(event);
  };

  handleNewTaskSubmit = (event) => {
    event.preventDefault();
    console.log('submit', this.state);
  };

  // saveToDB(() => { })

  return (
    <Container className="mb-5">

      <Row>
        <Col>
          Task Data
        </Col>
        <Col>
          <AddTodoTask />
        </Col>
      </Row>
    </Container>
  );
};

export default Task;
