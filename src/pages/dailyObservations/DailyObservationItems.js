import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getService } from "../../redux/actions/serviceActions";
import AddItem from "./AddItem";
import ItemPreview from "./ItemPreview";
import { GrAddCircle } from "react-icons/gr";
import { getItems } from "../../redux/actions/dailyObservationItemActions";

const DailyObservationItems = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { dailyObservationItems, loading, error } = useSelector(
    (state) => state.dailyObservationItemList
  );

  const { success } = useSelector((state) => state.dailyObservationItemDetails);

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getItems(slug));
  }, [dispatch, slug]);

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
                Daily Observation Items
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Name</th>
                    <th>Element</th>
                    <th>Active</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyObservationItems &&
                    dailyObservationItems.map((item) => (
                      <tr key={item._id}>
                        <ItemPreview item={item} service={slug} />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddItem show={show} handleClose={handleClose} service={slug} />
        </Col>
      </Row>
    </Container>
  );
};

export default DailyObservationItems;
