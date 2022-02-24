import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  deleteAbsence,
  removeDaysFromAbsencePeriod,
} from "../../redux/actions/absenceActions";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const AbsencePreview = ({ absence, getAbsences }) => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState(absence.days);
  const absencesRemoved = (e, id, day) => {
    e.preventDefault();
    setDates(dates.filter((date) => date !== day));
    dispatch(removeDaysFromAbsencePeriod(id, dates));
    getAbsences();
  };
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
        getAbsences();
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
        return (
          <div key={day}>
            <p>{moment(day).format("dddd, DD/MMMM/YYYY")}</p>
            <button onClick={(e) => absencesRemoved(e, absence._id, day)}>
              -
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AbsencePreview;
