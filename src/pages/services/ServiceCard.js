import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import EditSevice from "./EditService";
import { useSelector } from "react-redux";

const ServiceCard = ({ service }) => {
  const { error, success } = useSelector((state) => state.serviceDetails);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
        <Button className="primary me-2">Access</Button>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>
        <Button className="danger">delete</Button>
      </Card.Footer>
    </Card>
  );
};

export default ServiceCard;
