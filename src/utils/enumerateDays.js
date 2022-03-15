import moment from "moment";

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

export default enumerateDaysBetweenDates;
