import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { addAppraisal } from "../../redux/actions/appraisalActions";
import { getEmployees } from "../../redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";

const AddAppraisal = ({ show, handleClose, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.appraisalDetails);
  useEffect(() => {
    dispatch(getEmployees(service));
  }, [dispatch, service]);
  const { employees } = useSelector((state) => state.employeeList);
  const validationSchema = yup.object({
    date: yup
      .string()
      .required("Please select the date when the supervsion took place."),
    employee: yup.string().required(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Record a New Appraisal</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            date: new Date(),
            employee: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addAppraisal(service, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={props.values.date}
                  onChange={props.handleChange("date")}
                  onBlur={props.handleBlur("date")}
                />
                {props.touched.date && (
                  <p className="text-danger">{props.errors.date}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Select the Employee:</Form.Label>
                <Form.Select
                  value={props.values.employee}
                  onChange={props.handleChange("employee")}
                >
                  {employees &&
                    employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Add Appraisal
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddAppraisal;
