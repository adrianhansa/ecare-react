import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getAppraisals } from "../../redux/actions/appraisalActions";
import { getService } from "../../redux/actions/serviceActions";
import AppraisalPreview from "./AppraisalPreview";
import { GrAddCircle } from "react-icons/gr";
import AddAppraisal from "./AddAppraisal";

const Appraisals = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { appraisals, loading, error } = useSelector(
    (state) => state.appraisalList
  );

  const { success } = useSelector((state) => state.appraisalDetails);

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getAppraisals(slug));
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
                Appraisals
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {appraisals &&
                    appraisals.map((appraisal) => (
                      <tr key={appraisal._id}>
                        <AppraisalPreview
                          appraisal={appraisal}
                          service={slug}
                        />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddAppraisal show={show} handleClose={handleClose} service={slug} />
        </Col>
      </Row>
    </Container>
  );
};

export default Appraisals;
