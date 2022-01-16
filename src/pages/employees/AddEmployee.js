import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { addEmployee } from "../../redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const AddEmployee = ({ show, handleClose, slug }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.employeeDetails);
  const validationSchema = yup.object({
    name: yup.string().required("Please provide a name for the service."),
    address: yup
      .string()
      .required("Please provide the employee email address."),
    email: yup.string().required("Please provide the employee phone number."),
    phone: yup.string().required("Please provide the employee phone number."),
    payrollNumber: yup
      .string()
      .required("Please provide the employee payroll number."),
    contractHours: yup
      .number()
      .required(
        "Please provide the employee weekly contract hours. Enter 0 if bank"
      ),
    role: yup
      .string()
      .required("Please provide the employee' role in the service."),
    accessLevel: yup
      .number()
      .required(
        "Please provide the employee access level for this applocation."
      ),
    driver: yup.bool(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Employee</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            name: "",
            address: "",
            phone: "",
            email: "",
            payrollNumber: "",
            contractHours: "",
            role: "",
            accessLevel: 1,
            driver: false,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addEmployee(slug, values));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1000,
            });
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Employee email"
                  value={props.values.email}
                  onChange={props.handleChange("email")}
                  onBlur={props.handleBlur("email")}
                />
                {props.touched.email && (
                  <p className="text-danger">{props.errors.email}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Payroll Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Employee payroll number"
                  value={props.values.payrollNumber}
                  onChange={props.handleChange("payrollNumber")}
                  onBlur={props.handleBlur("payrollNumber")}
                />
                {props.touched.payrollNumber && (
                  <p className="text-danger">{props.errors.payrollNumber}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Service address"
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
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Contract hours / week</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Contract hours"
                  value={props.values.contractHours}
                  onChange={props.handleChange("contractHours")}
                  onBlur={props.handleBlur("contractHours")}
                />
                {props.touched.contractHours && (
                  <p className="text-danger">{props.errors.contractHours}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Access level</Form.Label>
                <Form.Select
                  value={props.values.accessLevel}
                  onChange={props.handleChange("accessLevel")}
                  onBlur={props.handleBlur("accessLevel")}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </Form.Select>
                {props.touched.accessLevel && (
                  <p className="text-danger">{props.errors.accessLevel}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={props.values.role}
                  onChange={props.handleChange("role")}
                  onBlur={props.handleBlur("role")}
                >
                  <option>RCW</option>
                  <option>NRCW</option>
                  <option>SRCW</option>
                  <option>DM</option>
                  <option>RM</option>
                  <option>Administrator</option>
                  <option>Cook</option>
                  <option>Handyman</option>
                </Form.Select>
                {props.touched.role && (
                  <p className="text-danger">{props.errors.role}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Driver</Form.Label>
                <Form.Check
                  type="checkbox"
                  value={props.values.driver}
                  onChange={props.handleChange("driver")}
                  onBlur={props.handleBlur("driver")}
                  checked={props.values.driver}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Add Service
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

export default AddEmployee;
