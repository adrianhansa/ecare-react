import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import EditEmployee from "./EditEmployee";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../redux/actions/employeeActions";

const EmployeeCard = ({ employee }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.employeeDetails);
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
        dispatch(deleteEmployee(employee._id));
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
    success && handleClose();
  }, [success]);
  return (
    <Card className="mb-4">
      <Card.Header>{employee.name}</Card.Header>
      <Card.Body>{employee.role}</Card.Body>
      <Card.Footer>
        <EditEmployee
          show={show}
          employee={employee}
          handleClose={handleClose}
          error={error}
        />
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>
        <Button className="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default EmployeeCard;
