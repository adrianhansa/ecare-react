import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { updateAppraisal } from "../../redux/actions/appraisalActions";
import { getEmployees } from "../../redux/actions/employeeActions";
import { useDispatch, useSelector } from "react-redux";

const EditAppraisal = ({ show, handleClose, appraisal, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.appraisalDetails);
  useEffect(() => {
    dispatch(getEmployees(service));
  }, [dispatch, service]);
  const { employees } = useSelector((state) => state.employeeList);
  const validationSchema = yup.object({
    date: yup
      .string()
      .required("Please select the date when the supervsion took place."),
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Appraisal</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Formik
          initialValues={{
            date: appraisal.date.split("T")[0],
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(updateAppraisal(service, appraisal._id, values));
          }}
        >
          {(props) => (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicDate">
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
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                onClick={props.handleSubmit}
              >
                Update Appraisal
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

export default EditAppraisal;
