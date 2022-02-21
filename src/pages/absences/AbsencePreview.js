import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  deleteAbsence,
  getAbsencesByEmployee,
} from "../../redux/actions/absenceActions";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const AbsencePreview = ({ absence, startDate, endDate, employee }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
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
        dispatch(deleteAbsence(id));
        dispatch(getAbsencesByEmployee(employee, startDate, endDate));
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Absence deleted",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  return (
    <div>
      <h4>
        {absence.notes ? absence.notes : "no reason given"},{" "}
        {absence.days.length > 1
          ? `${absence.days.length} days`
          : `${absence.days.length} day`}
        <AiOutlineDelete
          type="button"
          onClick={() => handleDelete(absence._id)}
          className="text-danger"
        />
      </h4>
      {absence.days.map((day) => {
        return <p key={day}>{moment(day).format("dddd, DD/MMMM/YYYY")}</p>;
      })}
    </div>
  );
};

export default AbsencePreview;
