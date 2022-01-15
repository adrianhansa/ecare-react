import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { addService } from "../../redux/actions/serviceActions";
import { useDispatch, useSelector } from "react-redux";

const AddService = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.serviceDetails);
  //   useEffect(() => {
  //     error && setErrorMessage(error);
  //     success && setSuccessAcction(success);
  //   }, [error, success, dispatch]);
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
        <Modal.Title>Add a New Service</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{ name: "", address: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addService(values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Service name"
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

export default AddService;
