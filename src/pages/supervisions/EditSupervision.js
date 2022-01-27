import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { updateSupervision } from "../../redux/actions/supervisionActions";
import { getEmployees } from "../../redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";

const EditSupervision = ({ show, handleClose, supervision, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.supervisionDetails);
  useEffect(() => {
    dispatch(getEmployees(service));
  }, [dispatch, service]);
  const { employees } = useSelector((state) => state.employeeList);
  const validationSchema = yup.object({
    date: yup
      .string()
      .required("Please select the date when the supervsion took place."),
    plannedDate: yup
      .string()
      .required("Please select a date for when you plan the supervision."),
    supervisee: yup.string().required(),
    supervisor: yup.string().required(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Supervision</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            date: supervision.date.split("T")[0],
            plannedDate: supervision.plannedDate.split("T")[0],
            supervisor: supervision.supervisor._id,
            supervisee: supervision.supervisee._id,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateSupervision(service, supervision._id, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Planned date</Form.Label>
                <Form.Control
                  type="date"
                  value={props.values.plannedDate}
                  onChange={props.handleChange("plannedDate")}
                  onBlur={props.handleBlur("plannedDate")}
                />
                {props.touched.plannedDate && (
                  <p className="text-danger">{props.errors.plannedDate}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={props.values.date}
                  onChange={props.handleChange("date")}
                  onBlur={props.handleBlur("date")}
                />
              </Form.Group>
              {props.touched.date && (
                <p className="text-danger">{props.errors.date}</p>
              )}
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Select the supervisee:</Form.Label>
                <Form.Select
                  value={props.values.supervisee}
                  onChange={props.handleChange("supervisee")}
                >
                  {employees &&
                    employees.map((supervisee) => (
                      <option key={supervisee._id} value={supervisee._id}>
                        {supervisee.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Select the supervisor:</Form.Label>
                <Form.Select
                  value={props.values.supervisor}
                  onChange={props.handleChange("supervisor")}
                >
                  {employees &&
                    employees.map((supervisor) => (
                      <option key={supervisor._id} value={supervisor._id}>
                        {supervisor.name}
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
                Update Supervision
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

export default EditSupervision;
