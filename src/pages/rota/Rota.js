import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import { getShifts } from "../../redux/actions/shiftActions";
import { useParams } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import WorkShift from "./WorkShift";
import { GrAddCircle } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";

const Rota = () => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
  const { slug } = useParams();
  useEffect(() => {
    setStartDate(moment(value[0]).format("MMM-DD-yyyy"));
    setEndDate(moment(value[1]).format("MMM-DD-yyyy"));
  }, [value]);

  const shiftList = useSelector((state) => state.shiftList);
  const employeeList = useSelector((state) => state.employeeList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees(slug));
    dispatch(getShifts(slug));
  }, [dispatch]);

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
        <Table responsive hover striped bordered className="mt-3">
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
              <td>Employee name</td>
              {myDays.map((day) => {
                return (
                  <td className="text-center" key={day}>
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
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  {myDays.map((day) => {
                    return (
                      <td key={day}>
                        <GrAddCircle
                          type="button"
                          onClick={() => openModal(day, employee)}
                          className="me-3"
                        />
                        <FiEdit type="button" color="green" className="me-1" />
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