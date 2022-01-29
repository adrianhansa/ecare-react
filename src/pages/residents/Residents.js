import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getService } from "../../redux/actions/serviceActions";
import AddResident from "./AddResident";
import ResidentPreview from "./ResidentPreview";
import { GrAddCircle } from "react-icons/gr";
import { getServiceUsers } from "../../redux/actions/serviceUserActions";

const Residents = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { serviceUsers, loading, error } = useSelector(
    (state) => state.serviceUserList
  );

  const { success } = useSelector((state) => state.serviceUserDetails);

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getServiceUsers(slug));
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
                Residents
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>D.O.B</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceUsers &&
                    serviceUsers.map((serviceUser) => (
                      <tr key={serviceUser._id}>
                        <ResidentPreview
                          serviceUser={serviceUser}
                          service={slug}
                        />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddResident show={show} handleClose={handleClose} service={slug} />
        </Col>
      </Row>
    </Container>
  );
};

export default Residents;
