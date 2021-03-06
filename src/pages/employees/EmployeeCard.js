import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditEmployee from "./EditEmployee";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../redux/actions/employeeActions";
import { getLatestSupervision } from "../../redux/actions/supervisionActions";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../redux/constants/url";

const EmployeeCard = ({ employee, service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.employeeDetails);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
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
        dispatch(deleteEmployee(employee._id, employee.service.slug));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Employee deleted",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  useEffect(() => {
    axios
      .get(`${URL}/absences/bradford-score/${employee._id}`)
      .then((result) => setScore(result.data))
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    dispatch(getLatestSupervision(employee._id));
  }, [dispatch]);

  useEffect(() => {
    success && handleClose();
  }, [success]);
  return (
    <>
      <td>{employee.name}</td>
      <td>{employee.payrollNumber}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.address}</td>
      <td>{employee.contractHours}</td>
      <td>{employee.role}</td>
      <td>10/02/2022</td>
      <td>{employee.accessLevel}</td>
      <td>{employee.driver ? "Yes" : "No"}</td>
      <td className="text-center">
        <Link to={`/services/absence-management/${service}/${employee._id}`}>
          Bradford score: {score}
        </Link>
      </td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>{" "}
        <EditEmployee
          show={show}
          employee={employee}
          handleClose={handleClose}
          error={error}
          slug={employee.service.slug}
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

export default EmployeeCard;
