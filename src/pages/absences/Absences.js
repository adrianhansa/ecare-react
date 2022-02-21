import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAbsencesByEmployee,
  deleteAbsence,
} from "../../redux/actions/absenceActions";
import AbsenceRecording from "./AbsenceRecording";
import { MdOutlineSick } from "react-icons/md";
import moment from "moment";
import bradfordScore from "../../utils/bradfordScore";
import { Row, Col, Container } from "react-bootstrap";
import { getEmployee } from "../../redux/actions/employeeActions";
import { getService } from "../../redux/actions/serviceActions";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const Absences = () => {
  const [startDate, setStartDate] = useState(
    moment(new Date())
      .startOf("week")
      .add(1, "day")
      .add(-364, "days")
      .format("MM-DD-YYYY")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );

  const { slug, employee } = useParams();
  const dispatch = useDispatch();
  const { loading, error, absences } = useSelector(
    (state) => state.absenceList
  );
  const employeeDetails = useSelector((state) => state.employeeDetails);
  useEffect(() => {
    dispatch(getAbsencesByEmployee(employee, startDate, endDate));
    dispatch(getEmployee(employee));
    dispatch(getService(slug));
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
    <Container fluid>
      <Row>
        <Col>
          {employeeDetails.employee && (
            <h1>
              Absences for {employeeDetails.employee.name}{" "}
              <MdOutlineSick
                type="button"
                size={30}
                onClick={() => setShow(true)}
                className="text-danger"
              />
            </h1>
          )}
          <h3>Bradford Score: {absences && bradfordScore(absences)}</h3>
          <AbsenceRecording
            show={show}
            handleClose={handleClose}
            employee={employee}
            service={slug}
          />
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {absences &&
            absences.map((absence) => {
              return (
                <div key={absence._id}>
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
                      <p key={day}>
                        {moment(day).format("dddd, DD/MMMM/YYYY")}
                      </p>
                    );
                  })}
                </div>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default Absences;
