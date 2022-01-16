import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditShift from "./EditShift";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteShift } from "../../redux/actions/shiftActions";

const ShiftPreview = ({ shift }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.shiftDetails);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteShift(shift._id));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Shift deleted",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  useEffect(() => {
    success && handleClose();
  }, [success]);
  return (
    <>
      <td>{shift.name}</td>
      <td>{shift.startTime}</td>
      <td>{shift.endTime}</td>
      <td>{shift.duration}</td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>{" "}
        <EditShift
          show={show}
          shift={shift}
          handleClose={handleClose}
          error={error}
        />
      </td>
      <td>
        <Button className="danger" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </>
  );
};

export default ShiftPreview;
