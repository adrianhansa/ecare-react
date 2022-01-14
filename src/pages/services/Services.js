import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { getServices } from "../../redux/actions/serviceActions";

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(
    (state) => state.serviceList
  );
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  return (
    <Container fluid>
      <Row className="mt-3">
        {error && <p className="text-danger">{error}</p>}
        {loading && <p>Loading...</p>}
        {services &&
          services.map((service) => (
            <Col sm={3} md={4} lg={3} key={service._id}>
              <Card className="mb-4">
                <Card.Header>{service.name}</Card.Header>
                <Card.Body>{service.address}</Card.Body>
                <Card.Footer>
                  <Button className="primary">Access</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Services;
