import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditSupervision from "./EditSupervision";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteSupervision } from "../../redux/actions/supervisionActions";
import moment from "moment";

const SupervisionPreview = ({ supervision, service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.supervisionDetails);
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
        dispatch(deleteSupervision(service, supervision._id));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Supervision deleted",
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
      <td>{supervision.supervisee.name}</td>
      <td>{supervision.supervisor.name}</td>
      <td>{moment(supervision.plannedDate).format("dddd DD-MM-YYYY")}</td>
      <td>{moment(supervision.date).format("dddd DD-MM-YYYY")}</td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>{" "}
        <EditSupervision
          show={show}
          supervision={supervision}
          handleClose={handleClose}
          error={error}
          service={service}
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

export default SupervisionPreview;
