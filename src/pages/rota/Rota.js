import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import { getShifts } from "../../redux/actions/shiftActions";
import { getWorkShiftsByInterval } from "../../redux/actions/workShiftActions";
import { useParams } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import WorkShift from "./WorkShift";
import { GrAddCircle } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";

const Rota = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [value, onChange] = useState([
    moment(new Date()).startOf("week").add(1, "day").format("MM-DD-YYYY"),
    moment(new Date()).startOf("week").add(28, "days").format("MM-DD-YYYY"),
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const handleClose = () => {
    setShow(false);
    setData(null);
  };

  const enumerateDaysBetweenDates = (startDate, endDate) => {
    var dates = [];

    var currDate = moment(startDate).startOf("day");
    var lastDate = moment(endDate).startOf("day");

    while (currDate.diff(lastDate) <= 0) {
      dates.push(currDate.clone().toDate());
      currDate.add(1, "days");
    }

    return dates;
  };

  const myDays = enumerateDaysBetweenDates(startDate, endDate);

  useEffect(() => {
    setStartDate(moment(value[0]).format("MM-DD-YYYY"));
    setEndDate(moment(value[1]).format("MM-DD-YYYY"));
    !data && dispatch(getWorkShiftsByInterval(slug, startDate, endDate));
    console.log(1);
  }, [value, startDate, endDate, data]);

  const shiftList = useSelector((state) => state.shiftList);
  const employeeList = useSelector((state) => state.employeeList);
  const { workShifts, loading, error } = useSelector(
    (state) => state.workShiftList
  );

  //TO BE PLACED IN A SEPARATE COMPONENT
  const getEmployeeShiftsPerDay = (workshifts, employee, day) => {
    const shifts = workshifts.filter((ws) => ws.employee === employee._id);
    const results = shifts.filter(
      (item) => item.date.split("T")[0] === moment(day).format("YYYY-MM-DD")
    );
    return (
      <>
        {results.length > 0 ? (
          <>
            {results.map((result) => {
              return (
                <div key={result._id}>
                  <span>{result.shift.name}</span>
                  <br />
                  {result.shift.present && (
                    <span>
                      {result.startTime} - {result.endTime}
                    </span>
                  )}
                </div>
              );
            })}
            <span className="text-info">
              {moment
                .utc(
                  results.reduce((acc, item) => acc + item.duration, 0) * 1000
                )
                .format("HH:mm")}
            </span>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(getEmployees(slug));
    dispatch(getShifts(slug));
  }, [dispatch, slug]);

  const openModal = (day, employee) => {
    setShow(true);
    setData({ day, employee });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Rota for {slug}</h2>
          {data && (
            <WorkShift
              service={slug}
              handleClose={handleClose}
              show={show}
              data={data}
              shifts={shiftList.shifts}
            />
          )}
          <DateRangePicker
            onChange={onChange}
            value={value}
            format="dd-MM-yyyy"
          />
        </Col>
        <Table
          responsive
          hover
          striped
          bordered
          className="mt-3"
          style={{ fontSize: 12 }}
        >
          <thead>
            <tr>
              <td></td>
              {myDays.map((day) => {
                return (
                  <td className="text-center" key={day}>
                    <span className="small">{moment(day).format("ddd")}</span>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>Employee {workShifts && workShifts.length}</td>
              {myDays.map((day) => {
                return (
                  <td className="text-center" key={day}>
                    <span>{moment(day).format("DD-MM-YY")}</span>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employeeList.employees &&
              employeeList.employees.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <span className={employee.driver ? "text-primary" : ""}>
                      {employee.name}
                    </span>
                  </td>
                  {myDays.map((day) => {
                    return (
                      <td key={day}>
                        <Row>
                          <Col
                            className="text-center"
                            style={{
                              borderBottom: "1px dashed grey",
                              margin: 4,
                            }}
                          >
                            <span>
                              {workShifts &&
                                getEmployeeShiftsPerDay(
                                  workShifts,
                                  employee,
                                  day
                                )}
                            </span>
                          </Col>
                          <div
                            style={{
                              fontSize: 13,
                              display: "flex",
                              justifyContent: "space-around",
                              marginTop: 5,
                              marginBottom: 1,
                            }}
                          >
                            <GrAddCircle
                              type="button"
                              onClick={() => openModal(day, employee)}
                            />
                            <FiEdit type="button" color="green" />
                          </div>
                        </Row>
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Rota;
