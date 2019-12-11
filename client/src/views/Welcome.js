import React from 'react'
import { Container, Row, Col } from "reactstrap";

export default function Welcome() {
  return (
    <div>
      <Container >
        <Row className="d-flex justify-content-center align-items-lg-center">
          <Col >
          <h3>Welcome to  </h3>
            <img src="/assets/Logo.png" className="img-fluid"></img>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-lg-center">
          <Col>
            <h5>
               Please Signup/Login to Use App
            </h5>
            <h4>
              Our project is helping to build better habits by encouraging positive behavior change and task management skills. Users create reoccurring tasks, characters are rewarded with experience and items or punished for not making progress on the tasks they have created. Zombies come at night and look for stragglers who aren’t keeping up with their goals, make sure you log in daily to mark your progress.
            </h4>

          </Col>
        </Row>
      </Container>
    </div>
  )
}
