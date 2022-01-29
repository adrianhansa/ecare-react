import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { updateServiceUser } from "../../redux/actions/serviceUserActions";
import { useDispatch, useSelector } from "react-redux";

const EditResident = ({ show, handleClose, serviceUser, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.serviceUserDetails);
  const validationSchema = yup.object({
    name: yup.string().required("Name is required."),
    dob: yup.string().required("Please add date of birth."),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Service User's Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            dob: serviceUser.dob,
            name: serviceUser.name,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateServiceUser(service, serviceUser._id, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={props.values.dob}
                  onChange={props.handleChange("dob")}
                  onBlur={props.handleBlur("dob")}
                />
                {props.touched.date && (
                  <p className="text-danger">{props.errors.dob}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={props.values.name}
                  onChange={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                />
              </Form.Group>
              {props.touched.content && (
                <p className="text-danger">{props.errors.name}</p>
              )}
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Update Message
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

export default EditResident;
