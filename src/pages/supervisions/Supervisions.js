import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getSupervisions } from "../../redux/actions/supervisionActions";
import { getService } from "../../redux/actions/serviceActions";
import AddSupervision from "./AddSupervision";
import SupervisionPreview from "./SupervisionPreview";
import { GrAddCircle } from "react-icons/gr";

const Supervisions = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { supervisions, loading, error } = useSelector(
    (state) => state.supervisionList
  );

  const { success } = useSelector((state) => state.supervisionDetails);

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getSupervisions(slug));
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
                Supervisions
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Supervisee</th>
                    <th>Supervisor</th>
                    <th>Planned date</th>
                    <th>Completed date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisions &&
                    supervisions.map((supervision) => (
                      <tr key={supervision._id}>
                        <SupervisionPreview
                          supervision={supervision}
                          service={slug}
                        />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddSupervision
            show={show}
            handleClose={handleClose}
            service={slug}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Supervisions;
