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
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/images/Children.png" height={124} alt="Children" />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/residents/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Children / Young people</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img
                    src="/images/Employees.png"
                    height={124}
                    alt="Employees"
                  />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/employees/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Employees</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/images/Rota.png" height={124} alt="Rota" />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/rota/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Rota</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/images/Handover.png" height={124} alt="Handover" />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/handover/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Handover</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img
                    src="/images/DailyNotes.png"
                    height={124}
                    alt="Daily Notes"
                  />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/daily-observations/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Daily Observations</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img
                    src="/images/CommunicationBook.png"
                    height={124}
                    alt="Communication book"
                  />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/communication-book/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Communication Book</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/images/Shifts.png" height={124} alt="Shifts" />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/shifts/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Shifts</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/images/Diary.png" height={124} alt="Diary" />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/diary/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Diary</h4>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} lg={3} xl={2}>
              <Card className="mx-1 mb-3">
                <Card.Title className="p-3">
                  <img src="/images/Roles.png" height={124} alt="Roles" />
                </Card.Title>
                <Card.Footer>
                  <Link
                    to={`/services/roles/${slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <h4>Roles</h4>
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
