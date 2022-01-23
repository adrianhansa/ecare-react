import React from "react";
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";

const WorkShiftContainer = ({ results, handleDeleteWorkShift }) => {
  return (
    <>
      {results.map((result) => (
        <div
          key={result._id}
          style={{
            background: result.shift.color,
            height: 60,
          }}
        >
          <span>{result.shift.name}</span>
          <br />
          {result.shift.present && (
            <span style={{ fontSize: 9 }}>
              {result.startTime}-{result.endTime}
            </span>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: 5,
              marginLeft: 5,
              fontSize: 16,
              paddingBottom: 4,
              marginBottom: 0,
            }}
          >
            <TiDeleteOutline
              type="button"
              color="red"
              onClick={() => handleDeleteWorkShift(result._id)}
            />
            <FiEdit type="button" color="green" />
          </div>
        </div>
      ))}
    </>
  );
};

export default WorkShiftContainer;
