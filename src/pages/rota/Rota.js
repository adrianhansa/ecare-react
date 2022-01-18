import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import {
  addWorkShift,
  getWorkShift,
} from "../../redux/actions/workShiftActions";
import { getShifts } from "../../redux/actions/shiftActions";
import { useParams } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";

const Rota = () => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numDays, setNumDays] = useState(0);
  const [days, setDays] = useState([]);

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
  //   console.log(myDays);
  const { slug } = useParams();
  useEffect(() => {
    setStartDate(moment(value[0]).format("MMM-DD-yyyy"));
    setEndDate(moment(value[1]).format("MMM-DD-yyyy"));
    setNumDays(Math.ceil((moment(value[1]) - moment(value[0])) / 86400000));

    // let selectedDays = [];
    // while (moment(value[0]).isSameOrBefore(moment(value[1]))) {
    //   selectedDays.push(moment(value[0]));
    //   moment(value[0]).add(1, "days");
    // }
    // setDays(selectedDays);
  }, [value]);

  const shiftList = useSelector((state) => state.shiftList);
  const employeeList = useSelector((state) => state.employeeList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees(slug));
    dispatch(getShifts(slug));
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Rota for {slug}</h2>
          <DateRangePicker
            onChange={onChange}
            value={value}
            format="dd-MM-yyyy"
          />
        </Col>
        <p>Start date: {startDate}</p>
        <p>End date: {endDate}</p>
        <p>Number of days: {numDays}</p>
        <Table responsive hover striped bordered>
          <thead>
            <tr>
              <td></td>
              {myDays.map((day) => {
                console.log(day);
                return (
                  <td className="text-center">
                    <span className="small">{moment(day).format("ddd")}</span>
                  </td>
                );
              })}
            </tr>
            <tr>
              <td>Employee name</td>
              {myDays.map((day) => {
                return (
                  <td className="text-center">
                    <span className="small">
                      {moment(day).format("DD-MM-YY")}
                    </span>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {employeeList.employees &&
              employeeList.employees.map((employee) => (
                <tr>
                  <td>{employee.name}</td>
                  {myDays.map((day) => {
                    return (
                      <td>
                        <span>
                          {employee.name} - {moment(day).format("DD-MM-YY")}
                        </span>
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
