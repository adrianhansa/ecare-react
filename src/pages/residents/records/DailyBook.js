import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getServiceUser } from "../../../redux/actions/serviceUserActions";
import { getService } from "../../../redux/actions/serviceActions";
import { Container, Col, Row, Card } from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";

const DailyBook = () => {
  const dispatch = useDispatch();
  const su = useSelector((state) => state.serviceUserDetails);
  const { slug, resident } = useParams();

  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const shifts = ["AM", "PM", "Night"];

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getServiceUser(slug, resident));
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        {su.loading && <p>Loading...</p>}
        {su.error && <p className="text-danger">{su.error}</p>}
        {su.serviceUser && (
          <>
            <h2 className="text-center">
              Daily records for {su.serviceUser.name}
            </h2>
            {shifts.map((shift) => {
              return (
                <Col
                  key={shift}
                  xl={3}
                  lg={3}
                  md={3}
                  sm={4}
                  xs={4}
                  className="mx-auto"
                >
                  <Link
                    to={`/services/daily-records/${slug}/${resident}/${date}/${shift}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card>
                      <Card.Header className="text-center">
                        <img
                          src="/images/Book.png"
                          alt="Record Daily Book"
                          height={120}
                        />
                      </Card.Header>
                      <Card.Body className="text-center">{shift}</Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </Container>
  );
};

export default DailyBook;
