import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { addCommunication } from "../../redux/actions/communicationActions";
import { useDispatch, useSelector } from "react-redux";

const AddCommunication = ({ show, handleClose, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.communicationDetails);
  const validationSchema = yup.object({
    date: yup.string().required("Please select a date for the shift."),
    content: yup.string().required("Please type the message."),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Message</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            date: new Date(),
            content: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addCommunication(service, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
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
                <Form.Label>Type the message</Form.Label>
                <Form.Control
                  as="textarea"
                  value={props.values.content}
                  onChange={props.handleChange("content")}
                  onBlur={props.handleBlur("content")}
                />
              </Form.Group>
              {props.touched.content && (
                <p className="text-danger">{props.errors.content}</p>
              )}
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Post Message
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

export default AddCommunication;
