import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getShifts } from "../../redux/actions/shiftActions";
import AddShift from "./AddShift";
import ShiftPreview from "./ShiftPreview";
import { GrAddCircle } from "react-icons/gr";

const Shifts = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { shifts, loading, error } = useSelector((state) => state.shiftList);

  const { success } = useSelector((state) => state.shiftDetails);

  useEffect(() => {
    dispatch(getShifts(slug));
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
                Shifts
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Shift name</th>
                    <th>Color</th>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Duration</th>
                    <th>Care hours</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts &&
                    shifts.map((shift) => (
                      <tr key={shift._id}>
                        <ShiftPreview shift={shift} />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddShift show={show} handleClose={handleClose} service={slug} />
        </Col>
      </Row>
    </Container>
  );
};

export default Shifts;
