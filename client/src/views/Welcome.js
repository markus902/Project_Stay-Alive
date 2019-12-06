import React from 'react'
import { Container, Row, Col  } from "reactstrap";

export default function Welcome() {
  return (
    <div>
      <Container >
        <Row className="d-flex justify-content-center align-items-lg-center">
          <Col >
            <img src="https://via.placeholder.com/800x200" className="img-fluid"></img>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-lg-center">
          <Col>
            <h3>
              Quick One to Two Sentence about the App
            </h3>
            <h3>
              Please Signup/Login to Use App
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
