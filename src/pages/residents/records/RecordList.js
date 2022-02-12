import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRecordsByResident } from "../../../redux/actions/dailyObservationActions";
import { getServiceUser } from "../../../redux/actions/serviceUserActions";
import moment from "moment";
import { Link } from "react-router-dom";

const RecordList = ({ resident, service }) => {
  const dispatch = useDispatch();
  const { loading, error, dailyObservations } = useSelector(
    (state) => state.dailyObservationList
  );
  const { serviceUser } = useSelector((state) => state.serviceUserDetails);
  useEffect(() => {
    dispatch(getServiceUser(service, resident));
    dispatch(getRecordsByResident(resident));
  }, [dispatch]);
  return (
    <div>
      {serviceUser && <h3>Previous Records for {serviceUser.name}</h3>}
      {loading && <p>Loading</p>}
      {error && <p className="text-danger">{error}</p>}
      {dailyObservations && (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {dailyObservations.map((item) => {
              return (
                <tr key={item._id}>
                  <td>
                    <Link
                      to={`/services/daily-records/${service}/${resident}/${item.date}/${item.shift}`}
                      style={{ textDecoration: "none" }}
                    >
                      {moment(item.date).format("ddd DD/MMM/YYYY")}
                    </Link>
                  </td>
                  <td>{item.shift}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RecordList;
