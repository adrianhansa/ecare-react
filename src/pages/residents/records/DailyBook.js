import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getItems } from "../../../redux/actions/dailyObservationItemActions";
import { getServiceUser } from "../../../redux/actions/serviceUserActions";
import { getService } from "../../../redux/actions/serviceActions";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
// import { addDailyBookEntry } from "../../../redux/actions/dailyBooksActions";
import moment from "moment";

const DailyBook = () => {
  const dispatch = useDispatch();
  const su = useSelector((state) => state.serviceUserDetails);
  const { dailyObservationItems, loading, error } = useSelector(
    (state) => state.dailyObservationItemList
  );
  const { slug, resident } = useParams();

  const [values, setValues] = useState(null);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [shift, setShift] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(slug, addDailyBookEntry({ date, shift, values }));
    console.log({ date, shift, values });
  };

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getItems(slug));
    dispatch(getServiceUser(slug, resident));
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col className="mx-auto" md={8} xs={12} sm={10} lg={6} xl={6}>
          {su.loading && <p>Loading...</p>}
          {su.error && <p className="text-danger">{error}</p>}
          {su.serviceUser && (
            <>
              <h2>Daily records for {su.serviceUser.name}</h2>
              {loading && <p>Daily book is loading...</p>}
              {error && <p className="text-danger">{error}</p>}
              <Form>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    format="DD/MM/YYYY"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Select the shift:</Form.Label>
                  <Form.Select onChange={(e) => setShift(e.target.value)}>
                    <option></option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                    <option value="Night">Night</option>
                  </Form.Select>
                </Form.Group>
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DailyBook;
