import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { updateEmployee } from "../../redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";

const EditEmployee = ({ show, handleClose, employee }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.employeeDetails);
  const validationSchema = yup.object({
    name: yup.string().required("Please provide a name for the service."),
    address: yup
      .string()
      .required("Please provide an address for the service."),
    phone: yup
      .string()
      .required("Please provide a phone number for the service."),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Employee Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            name: employee.name,
            address: employee.address,
            phone: employee.phone,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateEmployee(employee._id, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Employee name"
                  value={props.values.name}
                  onChange={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                />
                {props.touched.name && (
                  <p className="text-danger">{props.errors.name}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Employee address"
                  value={props.values.address}
                  onChange={props.handleChange("address")}
                  onBlur={props.handleBlur("address")}
                />
                {props.touched.address && (
                  <p className="text-danger">{props.errors.address}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone number"
                  value={props.values.phone}
                  onChange={props.handleChange("phone")}
                  onBlur={props.handleBlur("phone")}
                />
                {props.touched.phone && (
                  <p className="text-danger">{props.errors.phone}</p>
                )}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Update Service
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

export default EditEmployee;
