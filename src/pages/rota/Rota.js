import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees } from "../../redux/actions/employeeActions";
import { addWorkShift } from "../../redux/actions/workShiftActions";
import { getShifts } from "../../redux/actions/shiftActions";
import { useParams } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const Rota = () => {
  const [value, onChange] = useState([new Date(), new Date()]);
  const { slug } = useParams();
  console.log(value);

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
      </Row>
    </Container>
  );
};

export default Rota;
