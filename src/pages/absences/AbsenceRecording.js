import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import { addAbsence } from "../../redux/actions/absenceActions";
import enumerateDaysBetweenDates from "../../utils/enumerateDays";

const AbsenceRecording = ({
  employee,
  show,
  handleClose,
  service,
  getAbsences,
}) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [value, onChange] = useState([
    new Date(
      moment(new Date()).startOf("week").add(1, "day").format("MM-DD-YYYY")
    ),
    new Date(
      moment(new Date()).startOf("week").add(1, "days").format("MM-DD-YYYY")
    ),
  ]);
  const { error } = useSelector((state) => state.absenceDetails);

  useEffect(() => {
    setStartDate(moment(value[0]).format("MM-DD-YYYY"));
    setEndDate(moment(value[1]).format("MM-DD-YYYY"));
  }, [value]);

  const handleSubmit = () => {
    dispatch(
      addAbsence(service, {
        employee,
        startDate,
        endDate,
        days: enumerateDaysBetweenDates(startDate, endDate),
        notes,
      })
    );
    getAbsences();
    !error && handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Record a new absence for {employee.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Form.Label className="text-danger">{error}</Form.Label>}
        <DateRangePicker
          onChange={onChange}
          value={value}
          format="dd-MM-yyyy"
        />
        <Form.Group>
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) => setNotes(e.target.value)}
          />
        </Form.Group>
        <div className="mt-3">
          <Button
            variant="primary"
            type="submit"
            className="me-3"
            onClick={handleSubmit}
          >
            Add Absence
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AbsenceRecording;
