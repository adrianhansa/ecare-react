import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAbsencesByEmployee } from "../../redux/actions/absenceActions";
import AbsenceRecording from "./AbsenceRecording";
import { MdOutlineSick } from "react-icons/md";
import moment from "moment";
import enumerateDaysBetweenDates from "../../utils/enumerateDays";
import { Row, Col, Container } from "react-bootstrap";

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

  const days = enumerateDaysBetweenDates(startDate, endDate);

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
  const daysOfTheWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const results = daysOfTheWeek.map((weekDay) => {
    return days.filter((day) => {
      return weekDay === moment(day).format("dddd");
    });
  });

  return (
    <Container fluid>
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
      <Row>
        {daysOfTheWeek.map((weekDay) => {
          return (
            <Col style={{ fontSize: 8 }} key={weekDay}>
              {weekDay}
            </Col>
          );
        })}
      </Row>
      <Row>
        {results.map((result, index) => {
          return (
            <Col key={index}>
              {result.map((r, i) => {
                return (
                  <Row key={i} style={{ marginBottom: 2 }}>
                    <Col
                      className="text-center"
                      style={{
                        fontSize: 8,
                        border: "1px solid grey",
                        padding: 10,
                        margin: 2,
                        borderRadius: 5,
                        hover: {
                          fontSize: 12,
                          color: "red",
                        },
                      }}
                    >
                      {moment(r).format("DD-MM-YYYY")}
                    </Col>
                  </Row>
                );
              })}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Absences;
