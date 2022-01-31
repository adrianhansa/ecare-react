import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditResident from "./EditResident";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteServiceUser } from "../../redux/actions/serviceUserActions";
import moment from "moment";
import { Link } from "react-router-dom";

const CommunicationPreview = ({ serviceUser, service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.serviceUserDetails);
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
        dispatch(deleteServiceUser(service, serviceUser._id));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Service user removed.",
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
      <td>{serviceUser.name}</td>
      <td>{moment(serviceUser.dob).format("DD-MM-YYYY")}</td>
      <td>
        <Link
          to={`/services/residents/daily-book/${service}/${serviceUser._id}`}
        >
          Daily Book
        </Link>
      </td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>{" "}
        <EditResident
          show={show}
          serviceUser={serviceUser}
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
