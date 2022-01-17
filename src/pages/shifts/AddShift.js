import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { addShift } from "../../redux/actions/shiftActions";
import { useDispatch, useSelector } from "react-redux";

const AddShift = ({ show, handleClose, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.shiftDetails);
  const validationSchema = yup.object({
    name: yup.string().required("Please provide a name for the shift."),
    present: yup.bool(),
    startTime: yup.string().required("Please select the start time."),
    endTime: yup.string().required("Please select the end time."),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Define a New Shift</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            name: "",
            present: false,
            startTime: "00:00",
            endTime: "00:00",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(addShift(service, values));
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
                  value={props.values.present}
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
                Save Shift
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

export default AddShift;
