import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getCommunications } from "../../redux/actions/communicationActions";
import { getService } from "../../redux/actions/serviceActions";
import AddCommunication from "./AddCommunication";
import CommunicationPreview from "./CommunicationPreview";
import { GrAddCircle } from "react-icons/gr";

const Communications = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { communications, loading, error } = useSelector(
    (state) => state.communicationList
  );

  const { success } = useSelector((state) => state.communicationDetails);

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getCommunications(slug));
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
                Communications
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>From</th>
                    <th>Message</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {communications &&
                    communications.map((communication) => (
                      <tr key={communication._id}>
                        <CommunicationPreview
                          communication={communication}
                          service={slug}
                        />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddCommunication
            show={show}
            handleClose={handleClose}
            service={slug}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Communications;
