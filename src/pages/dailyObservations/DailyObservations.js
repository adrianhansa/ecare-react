import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getServiceUsers } from "../../redux/actions/serviceUserActions";

const DailyObservations = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { serviceUsers, loading, error } = useSelector(
    (state) => state.serviceUserList
  );
  useEffect(() => {
    dispatch(getServiceUsers(slug));
  }, [dispatch]);
  return (
    <div>
      <h1>Daily Observations</h1>
      {serviceUsers &&
        serviceUsers.map((su) => {
          return (
            <Card>
              <Card.Title>
                <h4>{su.name}</h4>
              </Card.Title>
              <Card.Body>
                <h5>Access Daily Book</h5>
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
};

export default DailyObservations;
