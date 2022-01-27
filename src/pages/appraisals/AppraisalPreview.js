import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditAppraisal from "./EditAppraisal";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteAppraisal } from "../../redux/actions/appraisalActions";
import moment from "moment";

const AppraisalPreview = ({ appraisal, service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.appraisalDetails);
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
        dispatch(deleteAppraisal(service, appraisal._id));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Appraisal deleted",
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
      <td>{appraisal.employee.name}</td>
      <td>{moment(appraisal.date).format("dddd DD-MM-YYYY")}</td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>{" "}
        <EditAppraisal
          show={show}
          appraisal={appraisal}
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

export default AppraisalPreview;
