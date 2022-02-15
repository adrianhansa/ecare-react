import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import {
  updateWorkShift,
  getWorkShiftsByInterval,
} from "../../redux/actions/workShiftActions";
import { getShifts } from "../../redux/actions/shiftActions";

const EditWorkShift = ({
  workshift,
  show,
  handleClose,
  service,
  startDate,
  endDate,
}) => {
  const dispatch = useDispatch();
  const { shifts } = useSelector((state) => state.shiftList);
  const [shift, setShift] = useState(workshift.shift);
  const [startTime, setStartTime] = useState(workshift.startTime);
  const [endTime, setEndTime] = useState(workshift.endTime);
  const [notes, setNotes] = useState(workshift.notes);
  const [allocatedTo, setAllocatedTo] = useState(workshift.allocatedTo);

  useEffect(() => {
    dispatch(getShifts(service));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateWorkShift(workshift._id, {
        shift,
        startTime,
        endTime,
        notes,
        allocatedTo,
      })
    );
    dispatch(getWorkShiftsByInterval(service, startDate, endDate));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit shift for {workshift.employee.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select the shift</Form.Label>
            <Form.Select
              onChange={(e) => {
                const item = shifts.find(
                  (shift) => shift._id === e.target.value
                );
                setStartTime(item.startTime);
                setEndTime(item.endTime);
                setShift(item);
              }}
            >
              <option value={workshift.shift._id}>
                {workshift.shift.name}
              </option>
              <option></option>
              {shifts &&
                shifts.map((shift) => (
                  <option key={shift._id} value={shift._id}>
                    {shift.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start time</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Form.Label>End time</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
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
          <Form.Group>
            <Form.Label>Allocated To</Form.Label>
            <Form.Control
              type="text"
              value={allocatedTo}
              onChange={(e) => setAllocatedTo(e.target.value)}
            />
          </Form.Group>
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

export default EditWorkShift;
