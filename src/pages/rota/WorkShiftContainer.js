import React from "react";
import { FiEdit } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import moment from "moment";

const WorkShiftContainer = ({
  workshifts,
  employee,
  day,
  handleDeleteWorkShift,
}) => {
  const shifts = workshifts.filter((ws) => ws.employee === employee._id);
  const results = shifts.filter(
    (item) => item.date.split("T")[0] === moment(day).format("YYYY-MM-DD")
  );
  return (
    <div>
      {results.length > 0 ? (
        <>
          {results.map((result) => (
            <div
              key={result._id}
              style={{
                background: result.shift.color,
                marginBottom: 5,
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
              <div>
                <span>
                  {moment
                    .utc(
                      results.reduce((acc, item) => acc + item.duration, 0) *
                        1000
                    )
                    .format("HH:mm")}
                </span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default WorkShiftContainer;
