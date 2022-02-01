import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateItem } from "../../redux/actions/dailyObservationItemActions";
import { useDispatch, useSelector } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import { AiOutlineMinusCircle } from "react-icons/ai";

const EditDiary = ({ show, handleClose, item, service }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.dailyObservationItemDetails);

  const [itemValues, setItemValues] = useState(item.values);
  const [itemValue, setItemValue] = useState("");
  const [description, setDescription] = useState(item.description);
  const [element, setElement] = useState(item.element);
  const [name, setName] = useState(item.name);
  const handleValues = () => {
    itemValue !== "" && setItemValues([...itemValues, itemValue]);
    setItemValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateItem(service, item._id, {
        name,
        description,
        element,
        values: itemValues,
      })
    );
    setItemValue("");
    setName("");
    setDescription("");
    setElement();
    setItemValues([]);
  };

  const removeItemValueHandler = (val) => {
    setItemValues(itemValues.filter((item) => val !== item));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Observation Item Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Element</Form.Label>
            <Form.Control
              type="text"
              value={element}
              onChange={(e) => setElement(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Define the values</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
            />
            <GrAddCircle type="button" onClick={handleValues} />
            {itemValues.length > 0 && (
              <ul>
                {itemValues.map((val) => {
                  return (
                    <li key={val}>
                      {val}{" "}
                      <AiOutlineMinusCircle
                        type="button"
                        onClick={() => removeItemValueHandler(val)}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="me-3"
            onClick={handleSubmit}
          >
            Update Item
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditDiary;
