import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { updateShift } from "../../redux/actions/shiftActions";
import { useDispatch, useSelector } from "react-redux";

const EditShift = ({ show, handleClose, shift }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.shiftDetails);
  const validationSchema = yup.object({
    name: yup.string().required("Please provide a name for the service."),
    startTime: yup.string().required("Please select the start time."),
    endTime: yup.string().required("Please select the end time."),
    present: yup.bool(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Shift Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            name: shift.name,
            present: shift.present,
            startTime: shift.startTime,
            endTime: shift.endTime,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateShift(shift._id, shift.service.slug, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Shift name"
                  value={props.values.name}
                  onChange={props.handleChange("name")}
                  onBlur={props.handleBlur("name")}
                />
                {props.touched.name && (
                  <p className="text-danger">{props.errors.name}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPresent">
                <Form.Label>Care hours</Form.Label>
                <Form.Check
                  type="checkbox"
                  value={props.values.present}
                  checked={props.values.present}
                  onChange={props.handleChange("present")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicStartTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  value={props.values.startTime}
                  onChange={props.handleChange("startTime")}
                  onBlur={props.handleBlur("startTime")}
                />
                {props.touched.startTime && (
                  <p className="text-danger">{props.errors.startTime}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEndTime">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  value={props.values.endTime}
                  onChange={props.handleChange("endTime")}
                  onBlur={props.handleBlur("endTime")}
                />
                {props.touched.endTime && (
                  <p className="text-danger">{props.errors.endTime}</p>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Update Shift Details
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

export default EditShift;
