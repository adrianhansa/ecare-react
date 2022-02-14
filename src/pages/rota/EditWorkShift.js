import React,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import moment from "moment";
import { updateWorkShift } from '../../redux/actions/workShiftActions';
import { getShifts } from "../../redux/actions/shiftActions";

const EditWorkShift = ({workshift,show,handleClose,service}) => {
    const dispatch = useDispatch()
    console.log(workshift)
    const {shifts} = useSelector(state=>state.shiftList)

    useEffect(()=>{
        dispatch(getShifts(service))
    },[dispatch])

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit shift for {workshift.employee.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label></Form.Label>
                </Form.Group>
            </Form>
        </Modal.Body>

        {/* <Modal.Body>
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

                  setStartTime(item.startTime);

                  setEndTime(item.endTime);
                  setShift(item);
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
        </Modal.Body> */}
      </Modal>
    );
}

export default EditWorkShift