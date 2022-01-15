import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getService } from "../../redux/actions/serviceActions";
import { Card, Col, Container, Row } from "react-bootstrap";

const ServiceScreen = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { service, loading, error } = useSelector(
    (state) => state.serviceDetails
  );
  useEffect(() => {
    dispatch(getService(slug));
  }, [dispatch, slug]);

  return (
    <Container fluid>
      <Row>
        <Col className="mx-auto text-center">
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {service && <h1>{service.name}</h1>}
          <Row className="mt-3">
            <Col>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/Children.png" height={124} alt="Children" />
                </Card.Title>
                <Card.Footer>
                  <Link to={`/services/cyp/${slug}`}>
                    <h4>Children / Young people</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/Employees.png" height={124} alt="Employees" />
                </Card.Title>
                <Card.Footer>
                  <Link to={`/services/employees/${slug}`}>
                    <h4>Employees</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/Rota.png" height={124} alt="Rota" />
                </Card.Title>
                <Card.Footer>
                  <Link to={`/services/rota/${slug}`}>
                    <h4>Rota</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/Handover.png" height={124} alt="Handover" />
                </Card.Title>
                <Card.Footer>
                  <Link to={`/services/handover/${slug}`}>
                    <h4>Handover</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img
                    src="/CommunicationBook.png"
                    height={124}
                    alt="Communication book"
                  />
                </Card.Title>
                <Card.Footer>
                  <Link to={`/services/communication-book/${slug}`}>
                    <h4>Communication Book</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceScreen;
