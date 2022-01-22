import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import { getShifts } from "../../redux/actions/shiftActions";
import {
  getWorkShiftsByInterval,
  deleteWorkShift,
} from "../../redux/actions/workShiftActions";
import { useParams } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import WorkShift from "./WorkShift";
import { GrAddCircle } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";

const Rota = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [value, onChange] = useState([
    new Date(
      moment(new Date()).startOf("week").add(1, "day").format("MM-DD-YYYY")
    ),
    new Date(
      moment(new Date()).startOf("week").add(14, "days").format("MM-DD-YYYY")
    ),
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
  const colWidth = 95 / myDays.length;

  const handleDeleteWorkShift = (id) => {
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
        dispatch(deleteWorkShift(id, slug));
        dispatch(getWorkShiftsByInterval(slug, startDate, endDate));
        setData(null);
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: "Shift deleted",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };

  useEffect(() => {
    setStartDate(moment(value[0]).format("MM-DD-YYYY"));
    setEndDate(moment(value[1]).format("MM-DD-YYYY"));
    !data && dispatch(getWorkShiftsByInterval(slug, startDate, endDate));
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
                <div
                  key={result._id}
                  className="mb-2"
                  style={{ background: result.shift.color }}
                >
                  <span className="mr-3">{result.shift.name}</span>
                  <FiDelete
                    type="button"
                    color="red"
                    className="me-auto"
                    onClick={() => handleDeleteWorkShift(result._id)}
                  />
                  <FiEdit type="button" color="green" />
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

  const countShifts = (shifts, workShifts, date) => {
    const totalShiftsPerDay = workShifts.filter((ws) => {
      return ws.date.split("T")[0] === moment(date).format("YYYY-MM-DD");
    });
    const shiftsByType = totalShiftsPerDay.filter((ts) => {
      return shifts.filter((shift) => {
        return shift.name === ts.shift.name;
      });
    });
    // totalShiftsPerDay.;
    console.log(totalShiftsPerDay);
    return shiftsByType.length;
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
          // hover
          bordered
          className="mt-3 p-0"
          style={{ fontSize: 12 }}
        >
          <thead className="bg-primary text-white">
            <tr>
              <td width="5%" className="p-0"></td>
              {myDays.map((day) => {
                return (
                  <td className="text-center p-0" key={day}>
                    <span className="small">{moment(day).format("ddd")}</span>
                    {workShifts &&
                      shiftList.shifts &&
                      countShifts(shiftList.shifts, workShifts, day)}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="p-0">Employee</td>
              {myDays.map((day) => {
                return (
                  <td
                    className="text-center p-0"
                    key={day}
                    width={`${colWidth}%`}
                  >
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
                  <td className="p-0">
                    <span className={employee.driver ? "text-primary" : ""}>
                      {employee.name}
                    </span>
                  </td>
                  {myDays.map((day) => {
                    return (
                      <td key={day} className="p-0">
                        <Row className="m-0">
                          <Col
                            className="text-center py-2"
                            style={{ minHeight: 100 }}
                          >
                            {workShifts &&
                              getEmployeeShiftsPerDay(
                                workShifts,
                                employee,
                                day
                              )}
                            <div
                              className="mt-auto"
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
                            </div>
                          </Col>
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
