import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import EditSevice from "./EditService";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleteService } from "../../redux/actions/serviceActions";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.serviceDetails);

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
        dispatch(deleteService(service._id));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Service deleted",
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
      <Card.Header>{service.name}</Card.Header>
      <Card.Body>{service.address}</Card.Body>
      <Card.Footer>
        <EditSevice
          show={show}
          service={service}
          handleClose={handleClose}
          error={error}
        />
        <Link className="btn btn-primary me-2" to={`/services/${service.slug}`}>
          Access
        </Link>
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

export default ServiceCard;
