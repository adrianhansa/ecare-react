import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EditItem from "./EditItem";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  toggleStatus,
} from "../../redux/actions/dailyObservationItemActions";

const ItemPreview = ({ item, service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector(
    (state) => state.dailyObservationItemDetails
  );
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
        dispatch(deleteItem(service, item._id));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Item removed.",
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
      <td>{item.description}</td>
      <td>
        {item.name}{" "}
        {item.values.length > 0 && (
          <ul>
            {item.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        )}
      </td>
      <td>{item.element}</td>
      <td>
        {item.active ? (
          <span
            onClick={() => dispatch(toggleStatus(service, item._id))}
            style={{ cursor: "pointer" }}
          >
            Yes
          </span>
        ) : (
          <span
            onClick={() => dispatch(toggleStatus(service, item._id))}
            style={{ cursor: "pointer" }}
          >
            No
          </span>
        )}
      </td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>
        <EditItem
          show={show}
          item={item}
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

export default ItemPreview;
