const bradfordScore = (absences) => {
  const totalPeriodsOfAbsence = absences.length;
  const totalNumberOfDays = absences.reduce(
    (acc, absence) => acc + absence.days.length,
    0
  );
  return totalNumberOfDays * totalPeriodsOfAbsence * totalPeriodsOfAbsence;
};

export default bradfordScore;
