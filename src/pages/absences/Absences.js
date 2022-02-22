import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAbsencesByEmployee } from "../../redux/actions/absenceActions";
import AbsenceRecording from "./AbsenceRecording";
import { MdOutlineSick } from "react-icons/md";
import moment from "moment";
import bradfordScore from "../../utils/bradfordScore";
import { Row, Col, Container } from "react-bootstrap";
import { getEmployee } from "../../redux/actions/employeeActions";
import { getService } from "../../redux/actions/serviceActions";
import AbsencePreview from "./AbsencePreview";

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
    dispatch(getEmployee(employee));
    dispatch(getService(slug));
  }, [dispatch, employee]);

  useEffect(() => {
    dispatch(getAbsencesByEmployee(employee, startDate, endDate));
  }, [startDate, endDate, employee, dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
            getAbsences={() =>
              dispatch(getAbsencesByEmployee(employee, startDate, endDate))
            }
          />
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          {absences &&
            absences.map((absence) => {
              return (
                <AbsencePreview
                  key={absence._id}
                  absence={absence}
                  employee={employee}
                  startDate={startDate}
                  endDate={endDate}
                  getAbsences={() =>
                    dispatch(
                      getAbsencesByEmployee(employee, startDate, endDate)
                    )
                  }
                />
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default Absences;
