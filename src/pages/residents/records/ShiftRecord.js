import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getService } from "../../../redux/actions/serviceActions";
import { getServiceUser } from "../../../redux/actions/serviceUserActions";
import { getItems } from "../../../redux/actions/dailyObservationItemActions";
import { Form, Container, Button, Col, Row, Card } from "react-bootstrap";
import {
  addRecord,
  updateRecord,
  findRecord,
} from "../../../redux/actions/dailyObservationActions";

const ShiftRecord = () => {
  const dispatch = useDispatch();
  const { slug, resident, date, shift } = useParams();

  const [values, setValues] = useState(null);
  const su = useSelector((state) => state.serviceUserDetails);
  const { dailyObservationItems, loading, error } = useSelector(
    (state) => state.dailyObservationItemList
  );

  const dailyObservationDetails = useSelector(
    (state) => state.dailyObservationDetails
  );

  useEffect(() => {
    dispatch(findRecord(slug, { date, shift, serviceUser: resident }));
    dispatch(getService(slug));
    dispatch(getItems(slug));
    dispatch(getServiceUser(slug, resident));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dailyObservationDetails.success) {
      dispatch(
        addRecord(slug, {
          date,
          shift,
          serviceUser: su.serviceUser._id,
          records: values,
        })
      );
    } else {
      dispatch(
        updateRecord(dailyObservationDetails.dailyObservation._id, {
          date,
          shift,
          records: values,
        })
      );
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={6} className="mx-auto">
          {loading && <p>Daily records book is loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          <Card className="mt-2">
            <Card.Header>
              {su.serviceUser && (
                <h2>
                  {shift} records for {su.serviceUser.name}
                </h2>
              )}
            </Card.Header>
            <Card.Body>
              <Form>
                {dailyObservationItems &&
                  dailyObservationItems.map((item) => {
                    return (
                      <Form.Group key={item._id} className="mb-4">
                        <Form.Label>{item.description}</Form.Label>
                        <br />
                        {item.element === "text" ? (
                          <Form.Control
                            type={item.element}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [item.name]: e.target.value,
                              })
                            }
                          />
                        ) : item.element === "textarea" ? (
                          <Form.Control
                            as="textarea"
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [item.name]: e.target.value,
                              })
                            }
                          />
                        ) : item.element === "selection" ? (
                          <Form.Select
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [item.name]: e.target.value,
                              })
                            }
                          >
                            {item.values.map((val) => {
                              return (
                                <option value={val} key={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </Form.Select>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    );
                  })}
                <Button onClick={handleSubmit} type="submit" className="mt-2">
                  Save Records
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftRecord;
