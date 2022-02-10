import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Table } from "react-bootstrap";
import { getEmployees } from "../../redux/actions/employeeActions";
import AddEmployee from "./AddEmployee";
import EmployeeCard from "./EmployeeCard";
import { GrAddCircle } from "react-icons/gr";
import { getService } from "../../redux/actions/serviceActions";

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
    dispatch(getService(slug));
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
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Payroll number</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Contract hours</th>
                    <th>Role</th>
                    <th>Latest Supervison</th>
                    <th>Access Level</th>
                    <th>Driver</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees &&
                    employees.map((employee) => (
                      <tr key={employee._id}>
                        <EmployeeCard employee={employee} slug={slug} />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddEmployee show={show} handleClose={handleClose} slug={slug} />
        </Col>
      </Row>
    </Container>
  );
};

export default Employees;
