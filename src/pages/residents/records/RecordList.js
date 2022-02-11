import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecordsByResident } from "../../../redux/actions/dailyObservationActions";

const RecordList = ({ resident }) => {
  const dispatch = useDispatch();
  const { loading, error, dailyObservations } = useSelector(
    (state) => state.dailyObservationList
  );
  useEffect(() => {
    dispatch(getRecordsByResident(resident));
    console.log(dailyObservations);
  }, [dispatch]);
  return (
    <div>
      <h3>Previous Records</h3>
    </div>
  );
};

export default RecordList;
