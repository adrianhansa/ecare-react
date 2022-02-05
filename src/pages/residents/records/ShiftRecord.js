import React from "react";
import { useParams } from "react-router-dom";

const ShiftRecord = () => {
  const { shift, date } = useParams(0);
  return (
    <div>
      <h1>
        {date}, {shift}
      </h1>
    </div>
  );
};

export default ShiftRecord;
