export function calculateExperience(startDateStr = '2021-04-26', asOfDate = new Date()) {
  const [startYear, startMonth, startDay] = startDateStr.split('-').map(Number);
  let totalMonths =
    (asOfDate.getFullYear() - startYear) * 12 +
    (asOfDate.getMonth() + 1 - startMonth);

  if (asOfDate.getDate() < startDay) totalMonths -= 1;
  totalMonths = Math.max(0, totalMonths);

  const years = Math.floor(totalMonths / 12);
  const runningMonth = (totalMonths % 12) + 1;
  const formatted = `${years}.${runningMonth} Years`;

  return {
    rawYears: totalMonths / 12,
    yearsNumber: totalMonths / 12,
    displayYears: `${years}.${runningMonth}`,
    formatted,
    shortFormatted: formatted,
  };
}
