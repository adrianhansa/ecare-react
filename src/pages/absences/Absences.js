import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAbsencesByEmployee } from "../../redux/actions/absenceActions";
import AbsenceRecording from "./AbsenceRecording";
import { MdOutlineSick } from "react-icons/md";
import moment from "moment";

const Absences = () => {
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );

  const { slug, employee } = useParams();
  const dispatch = useDispatch();
  const { loading, error, absences } = useSelector(
    (state) => state.absenceList
  );
  useEffect(() => {
    dispatch(getAbsencesByEmployee(employee, startDate, endDate));
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <div>
      <h1>
        Absences{" "}
        <MdOutlineSick
          type="button"
          size={30}
          onClick={() => setShow(true)}
          className="text-danger"
        />
      </h1>
      <AbsenceRecording
        show={show}
        handleClose={handleClose}
        employee={employee}
        service={slug}
      />
    </div>
  );
};

export default Absences;
