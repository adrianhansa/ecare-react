import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";

const AbsenceRecording = ({ employee, show, handleClose }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [value, onChange] = useState([
    new Date(
      moment(new Date()).startOf("week").add(1, "day").format("MM-DD-YYYY")
    ),
    new Date(
      moment(new Date()).startOf("week").add(28, "days").format("MM-DD-YYYY")
    ),
  ]);

  useEffect(() => {
    setStartDate(moment(value[0]).format("MM-DD-YYYY"));
    setEndDate(moment(value[1]).format("MM-DD-YYYY"));
  }, [value]);

  const handleSubmit = () => {
    console.log(startDate, endDate);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Record a new absence for {employee.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DateRangePicker
          onChange={onChange}
          value={value}
          format="dd-MM-yyyy"
        />
      </Modal.Body>
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
    </Modal>
  );
};

export default AbsenceRecording;
