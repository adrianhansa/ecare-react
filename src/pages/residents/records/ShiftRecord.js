import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getService } from "../../../redux/actions/serviceActions";
import { getServiceUser } from "../../../redux/actions/serviceUserActions";
import { getItems } from "../../../redux/actions/dailyObservationItemActions";
import { Form, Container, Button, Col, Row } from "react-bootstrap";
import {
  addRecord,
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

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getItems(slug));
    dispatch(getServiceUser(slug, resident));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addRecord(slug, {
        date,
        shift,
        serviceUser: su.serviceUser._id,
        records: values,
      })
    );
    console.log(slug, date, shift, su.serviceUser._id, values);
  };
  const { success, dailyObservation } = useSelector(
    (state) => state.dailyObservationDetails
  );

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
          {loading && <p>Daily book is loading...</p>}
          {error && <p className="text-danger">{error}</p>}
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
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftRecord;
