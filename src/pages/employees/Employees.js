import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { getEmployees } from "../../redux/actions/employeeActions";
import AddEmployee from "./AddEmployee";
import EmployeeCard from "./EmployeeCard";
import { GrAddCircle } from "react-icons/gr";

const Employees = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { employees, loading, error } = useSelector(
    (state) => state.employeeList
  );

  const { success } = useSelector((state) => state.employeeDetails);

  useEffect(() => {
    dispatch(getEmployees(slug));
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
                Employees {slug}
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
            </Col>
          </Row>
          <AddEmployee show={show} handleClose={handleClose} slug={slug} />
          <Row>
            {employees &&
              employees.map((employee) => (
                <Col sm={6} md={4} lg={3} xl={2} key={employee._id}>
                  <EmployeeCard employee={employee} slug={slug} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Employees;
