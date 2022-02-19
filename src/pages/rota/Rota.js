import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import { getShifts } from "../../redux/actions/shiftActions";
import {
  getWorkShiftsByInterval,
  deleteWorkShift,
} from "../../redux/actions/workShiftActions";
import { getService } from "../../redux/actions/serviceActions";
import { useParams } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import WorkShift from "./WorkShift";
import { GrAddCircle } from "react-icons/gr";
import Swal from "sweetalert2";
import WorkShiftContainer from "./WorkShiftContainer";
import enumerateDaysBetweenDates from "../../utils/enumerateDays";

const Rota = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [value, onChange] = useState([
    new Date(
      moment(new Date()).startOf("week").add(1, "day").format("MM-DD-YYYY")
    ),
    new Date(
      moment(new Date()).startOf("week").add(28, "days").format("MM-DD-YYYY")
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

  const myDays = enumerateDaysBetweenDates(startDate, endDate);
  const colWidth = 95 / myDays.length;

  const handleDeleteWorkShift = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
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
  const { workShifts } = useSelector((state) => state.workShiftList);

  useEffect(() => {
    dispatch(getService(slug));
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
    const shiftsByType = [];
    shifts.map((shift) => {
      shiftsByType.push({
        name: shift.name[0],
        color: shift.color,
        present: shift.present,
        count: totalShiftsPerDay.filter((item) => {
          return shift.name === item.shift.name;
        }).length,
      });
    });
    return shiftsByType;
  };

  const countHours = (employee, workShifts) => {
    const employeeShifts = workShifts.filter((ws) => {
      return ws.employee._id === employee._id;
    });
    let total = 0;
    employeeShifts.forEach((item) => {
      total = total + item.duration;
    });
    const days = Math.floor(total / 86400);
    return `${
      days * 24 +
      Number(
        moment
          .utc(total * 1000)
          .format("HH:mm")
          .split(":")[0]
      )
    } h: ${
      moment
        .utc(total * 1000)
        .format("HH:mm")
        .split(":")[1]
    } m`;
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
                    <div className="mb-2">
                      <span className="small">{moment(day).format("ddd")}</span>
                    </div>
                    {workShifts &&
                      shiftList.shifts &&
                      countShifts(shiftList.shifts, workShifts, day).map(
                        (x) =>
                          x.present && (
                            <div className="mb-1" key={x.name}>
                              <span
                                style={{ color: x.color, letterSpacing: 3 }}
                              >
                                {x.name}:{x.count}
                              </span>
                            </div>
                          )
                      )}
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
                    <div className="mt-2">
                      Hours worked: <br />
                      <span className="text-primary">
                        {workShifts && countHours(employee, workShifts)}
                      </span>
                    </div>
                  </td>
                  {myDays.map((day) => (
                    <td key={day} className="p-0">
                      <div
                        className="m-1 mt-auto"
                        style={{
                          border: "1px solid grey",
                        }}
                      >
                        <div className="text-center">
                          {workShifts && (
                            <>
                              <WorkShiftContainer
                                workshifts={workShifts}
                                employee={employee}
                                day={day}
                                startDate={startDate}
                                endDate={endDate}
                                handleDeleteWorkShift={handleDeleteWorkShift}
                                service={slug}
                              />
                              <div
                                // className="mt-auto"
                                style={{
                                  fontSize: 13,
                                  display: "flex",
                                  justifyContent: "space-around",
                                  marginTop: 1,
                                  marginBottom: 1,
                                }}
                              >
                                <GrAddCircle
                                  type="button"
                                  onClick={() => openModal(day, employee)}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Rota;
