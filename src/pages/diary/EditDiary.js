import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { updateDiaryEntry } from "../../redux/actions/diaryEntryActions";
import { useDispatch, useSelector } from "react-redux";

const EditDiary = ({ show, handleClose, diary, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.serviceUserDetails);
  const validationSchema = yup.object({
    content: yup.string().required("Please enter the content."),
    date: yup.string().required("Please select a date."),
    time: yup.string(),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Diary Entry Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            date: diary.date.split("T")[0],
            time: diary.time,
            content: diary.content,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateDiaryEntry(service, diary._id, values));
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
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={props.values.time}
                  onChange={props.handleChange("time")}
                  onBlur={props.handleBlur("time")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  type="text"
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
                Update Diary Entry
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

export default EditDiary;
