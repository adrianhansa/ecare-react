import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import moment from "moment";
import {
  addWorkShift,
  getWorkShifts,
  getWorkShift,
  updateWorkShift,
  deleteWorkShift,
} from "../../redux/actions/workShiftActions";

const WorkShift = ({ data, service, shifts, show, handleClose }) => {
  const dispatch = useDispatch();
  const [selectedShift, setSelectedShift] = useState(false);
  const [shift, setShift] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [notes, setNotes] = useState("");
  const [allocatedTo, setAllocatedTo] = useState("");
  const { error } = useSelector((state) => state.workShiftDetails);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addWorkShift(service, data.employee._id, {
        date: moment(data.day).format("MM-DD-YYYY"),
        shift: shift._id,
        startTime,
        endTime,
        notes,
        allocatedTo,
      })
    );
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Add a Shift for {data.employee.name} on{" "}
          {moment(data.day).format("DD/MM/YY")}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>
              Select the shift {selectedShift && selectedShift}
              {startTime}---{endTime}
            </Form.Label>
            <Form.Select
              value={shift._id}
              onChange={(e) => {
                const item = shifts.find(
                  (shift) => shift._id === e.target.value
                );
                setShift(item);
                setStartTime(item.startTime);

                setEndTime(item.endTime);
                setSelectedShift(true);
              }}
            >
              {shifts &&
                shifts.map((shift) => (
                  <option key={shift._id} value={shift._id}>
                    {shift.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          {selectedShift && (
            <>
              <Form.Group>
                <Form.Label>Start time</Form.Label>
                <Form.Control
                  type="time"
                  value={shift.startTime ? shift.startTime : startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <Form.Label>End time</Form.Label>
                <Form.Control
                  type="time"
                  value={shift.endTime ? shift.endTime : endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Form.Group>
            </>
          )}
          {selectedShift && shift && shift.present && (
            <Form.Group>
              <Form.Label>Allocated To</Form.Label>
              <Form.Control
                type="text"
                value={allocatedTo}
                onChange={(e) => setAllocatedTo(e.target.value)}
              />
            </Form.Group>
          )}
          <div className="mt-3">
            <Button
              variant="primary"
              type="submit"
              className="me-3"
              onClick={handleSubmit}
            >
              Save Shift
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WorkShift;
