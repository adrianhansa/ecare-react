import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditCommunication from "./EditCommunication";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteCommunication } from "../../redux/actions/communicationActions";
import moment from "moment";

const CommunicationPreview = ({ communication, service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.communicationDetails);
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
        dispatch(deleteCommunication(service, communication._id));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Message deleted",
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
      <td>{moment(communication.date).format("dddd DD-MM-YYYY")}</td>
      <td>{communication.employee.name}</td>
      <td>{communication.content}</td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>{" "}
        <EditCommunication
          show={show}
          communication={communication}
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

export default CommunicationPreview;
