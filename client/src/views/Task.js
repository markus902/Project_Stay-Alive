import React from "react";
import { Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">

      <Row>
        <Col>
          Task Data
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
