import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { addItem } from "../../redux/actions/dailyObservationItemActions";
import { useDispatch, useSelector } from "react-redux";

const AddItem = ({ show, handleClose, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.dailyObservationItemDetails);
  const validationSchema = yup.object({
    description: yup.string().required("Please provide a description."),
    element: yup.string(),
    name: yup.string(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Item for the Daily Observations</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            description: "",
            element: "",
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addItem(service, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={props.values.description}
                  onChange={props.handleChange("description")}
                  onBlur={props.handleBlur("description")}
                />
                {props.touched.description && (
                  <p className="text-danger">{props.errors.description}</p>
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
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Element</Form.Label>
                <Form.Control
                  type="text"
                  value={props.values.element}
                  onChange={props.handleChange("element")}
                  onBlur={props.handleBlur("element")}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Add Item
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

export default AddItem;
