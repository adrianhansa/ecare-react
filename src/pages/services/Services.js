import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { getServices } from "../../redux/actions/serviceActions";
import AddService from "./AddService";
import { GrAddCircle } from "react-icons/gr";

const Services = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { services, loading, error } = useSelector(
    (state) => state.serviceList
  );

  const { success } = useSelector((state) => state.serviceDetails);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    success && handleClose();
  }, [success]);

  return (
    <Container fluid>
      <Row className="mt-3">
        {error && <p className="text-danger">{error}</p>}
        {loading && <p>Loading...</p>}
        <Col>
          <Row>
            <Col className="mx-auto">
              <h3 className="text-center">
                Services{" "}
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
            </Col>
          </Row>
          <AddService show={show} handleClose={handleClose} />
          <Row>
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
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
